import React from 'react';
import Map from './Map';
import Menu from './menu/Menu';
import DilemmaPopup from './popups/DilemmaPopup';
import SurprisePopup from './popups/SurprisePopup';
import Utils from "../utils";
import Constants from "../constants";
import Backend from '../backend/backend';
import DB from "./automation_output.json";

export default class GameView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dilemmas: [],
            effects: [],
            emissions: Constants.INITIAL_EMISSIONS,
            money: Constants.INITIAL_MONEY,
            qof: Constants.INITIAL_QUALITY_OF_LIFE,
            year: Constants.INITIAL_YEAR,
            ticks: 0,
            scheduled: [],
            openDilemma: undefined // Constants.DILEMMAS[0].ID
        }
    }

    componentDidMount() {
        // Start game loop
        if(this.intervalId === undefined)
            this.intervalId = setInterval(this.gameLoopTick.bind(this), Constants.GAME_TICK_SECONDS * 1000);
    }

    // This is called every game tick
    gameLoopTick() {
        // TODO handle case if already has open popup
        const newState = Backend.getState();
        this.processScheduled(newState.ticks, () => {
            const newEvents = newState.active_events.filter(
                e => (this.state.dilemmas.find(ee => ee.ID === e) === undefined) && e != this.state.openDilemma
            )
    
            // let surprise = newEvents.find(Backend.isEventSurprise);
            // if(surprise !== undefined)
            //     this.addSurprise(surprise);

            let dilemmaEvents = newEvents.filter(eId => !Backend.isEventSurprise(eId));
            this.addDilemmas(dilemmaEvents);
        
            this.setState({
                year: newState.year,
                ticks: newState.ticks,
                emissions: newState.emissions,
                money: newState.money,
                qof: newState.quality_of_life,
            })
        });

    }

    addDilemmas(dilemmaIds) {
        const dilemmasToAdd = dilemmaIds.map(dId => {
            const dilemma = Backend.getEvent(dId);
            const area = Constants.AREAS[dilemma.placement - 1];
            // Calculate random location within area
            const relativeX = Utils.random(0, area.w - Constants.DILEMMA_LOCATION_W);
            const relativeY = Utils.random(0, area.y - Constants.DILEMMA_LOCATION_H);
            return { ID: dId, x: relativeX, y: relativeY, isDeleted: false };
        })
        let newDilemmas = [...this.state.dilemmas, ...dilemmasToAdd];
        this.setState({ dilemmas: newDilemmas }, () => {
            // Now add timeouts
            // TODO: Consider in the future doing this a scheduling mechanism based on ticks, linear
            dilemmaIds.forEach(dId => {
                const d = Backend.getEvent(dId);
                if(!d) return;
                this.schedule(() => this.removeDilemma(dId), Constants.DILEMMA_LIFETIME);
            });
        })
    }

    addSurprise(surpriseDilemmaId) {
        this.openDilemmaPopup(surpriseDilemmaId);
    }

    openDilemmaPopup(dilemmaId) {
        if (this.state.openDilemma !== undefined) {
            console.log("WARNING: tried to open a surprise while already has an open one. ignoring.");
            return;
        }
        Backend.setPopupOpen(true);
        this.setState({ openDilemma: dilemmaId });
    }

    // TODO here because anywhere is good: fix bug of rejumping dilemmas

    removeDilemma(dilemmaId) {
        // We first change it to deleted, then wait for animation finish, then really delete
        // TODO Fix effect jumping app when location disappears
        // TODO dont delete as long as dilemma in openDillema? just delete when unsetting it
        if(!Backend.isEventSurprise(dilemmaId))
            this.addEffect(this.state.dilemmas.find(d => d.ID === dilemmaId));

        var newDilemmasState = this.state.dilemmas.map(d => d.ID === dilemmaId ? { ...d, isDeleted: true } : d);
        this.setState({ dilemmas: newDilemmasState }, () => {
            // Now wait for the destruction to finish
            this.schedule(() => {
                newDilemmasState = this.state.dilemmas.filter(d => d.ID !== dilemmaId);
                Backend.deleteEvent(dilemmaId);
                // TODO Add effect for when missed event and call proper backend function to apply to metrics
                this.setState({dilemmas: newDilemmasState});
            }, Constants.DILEMMA_LOCATION_DESTRUCT_ANIMATION_TIME);
        })
    }

    schedule(callback, timeInSeconds) {
        const task = {
            callback,
            tickTime: this.state.ticks + (timeInSeconds / Constants.GAME_TICK_SECONDS)
        }
        this.setState({scheduled: [...this.state.scheduled, task]});
    }

    processScheduled(currentTicks, callbackAfterFinished) {
        let newScheduled = [];
        this.state.scheduled.forEach(s => {
            if(s.tickTime <= currentTicks)
                s.callback();
            else 
                newScheduled.push(s);
        })
        if(newScheduled.length !== this.state.scheduled)
            this.setState({scheduled: newScheduled}, callbackAfterFinished);
        else
            callbackAfterFinished();
    }

    addEffect(questionObject) {
        let newEffects = [];
        let originalQuestionObject = Backend.getEvent(questionObject.ID);
        const base = {
            x: questionObject.x,
            y: questionObject.y,
            placement: originalQuestionObject.placement,
        }

        newEffects.push({
            ...base,
            ID: "em_" + questionObject.ID,
            delay: Constants.DILEMMA_LOCATION_DESTRUCT_ANIMATION_TIME + 1,
            amount: originalQuestionObject.unhandled_money_delta,
            metric: Constants.MONEY_METRIC
        })

        newEffects.push({
            ...base,
            ID: "ee_" + questionObject.ID,
            delay: Constants.DILEMMA_LOCATION_DESTRUCT_ANIMATION_TIME + 2,
            amount: originalQuestionObject.unhandled_emissions_delta,
            metric: Constants.EMISSIONS_METRIC
        })

        newEffects.push({
            ...base,
            ID: "eq_" + questionObject.ID,
            delay: Constants.DILEMMA_LOCATION_DESTRUCT_ANIMATION_TIME + 3,
            amount: originalQuestionObject.unhandled_life_quality_delta,
            metric: Constants.QOF_METRIC
        })

        this.setState({ effects: [...this.state.effects, ...newEffects] });
    }

    removeEffect(effectId) {
        var newEffectsState = this.state.effects.filter(e => e.ID !== effectId);
        this.setState({ effects: newEffectsState });
    }

    closeDilemma() {
        // If deleted in the time of choice making, delete it now
        // NOTE Be aware that here, dilemma may no longer be in the state.dilemmas list
        Backend.setPopupOpen(false);
        this.setState({ openDilemma: undefined });
    }

    onDilemmaLocationClick(dId) {
        this.openDilemmaPopup(dId);
    }

    onSurpriseDismiss(sId) {
        Backend.deleteEvent(sId);
        // TODO add effects
        this.closeDilemma();
    }

    onChooseOption(optId) {
        Backend.applyEffectByOption(optId);
        // TODO Add effects
        this.closeDilemma();
        this.removeDilemma(this.state.openDilemma);
    }

    render() {
        var popup = '';
        if(this.state.openDilemma) {
            const dilemma = Backend.getEvent(this.state.openDilemma);
            // Check if dillema or surprise
            if(dilemma.option_ids.length > 0)
                popup = (
                    <DilemmaPopup event={dilemma}
                        onClose={this.closeDilemma.bind(this)}
                        onChooseOption={this.onChooseOption.bind(this)} />
                )
            else
                popup = (
                    <SurprisePopup event={dilemma} onDismiss={this.onSurpriseDismiss.bind(this)} />
                )
        }
        const popupOpen = popup !== '';

        return (
            <div id="game-view-container">
                {popup}
                <Menu emissions={this.state.emissions} money={this.state.money}
                    qof={this.state.qof} year={this.state.year} popupOpen={popupOpen} />
                <Map dilemmas={this.state.dilemmas} effects={this.state.effects}
                    onDilemmaLocationClick={this.onDilemmaLocationClick.bind(this)}
                    onEffectDone={this.removeEffect.bind(this)}
                    popupOpen={popupOpen}
                />
            </div>
        );
    }
}
