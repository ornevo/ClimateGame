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
            effects: [
                { ID: "etestod", x: 10, y: 2, placement: 4, delay: 2 + 5 + Constants.DILEMMA_LOCATION_DESTRUCT_ANIMATION_TIME, amount: 4, metric: Constants.MONEY_METRIC }
            ],
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
                e => this.state.dilemmas.find(ee => ee.ID === e) === undefined
            )
    
            let dilemmaEvents = newEvents.filter(eId => Backend.getEvent(eId).option_ids.length > 0);
            this.addDilemmas(dilemmaEvents);
    
            let surprise = newEvents.find(eId => Backend.getEvent(eId).option_ids.length === 0);
            // if(surprise !== undefined)
            //     this.addSurprise(surprise);
    
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
        // console.log("Adding dilemmas ", dilemmaIds);
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
        this.setState({ openDilemma: dilemmaId });
    }

    // TODO here because anywhere is good: fix bug of rejumping dilemmas

    removeDilemma(dilemmaId) {
        // We first change it to deleted, then wait for animation finish, then really delete
        // TODO Fix effect jumping app when location disappears
        // TODO dont delete as long as dilemma in openDillema? just delete when unsetting it

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
        this.setState({scheduled: newScheduled}, callbackAfterFinished);
    }

    removeEffect(effectId) {
        var newEffectsState = this.state.effects.filter(e => e.ID !== effectId);
        this.setState({ effects: newEffectsState });
    }

    closeDilemma() {
        // If deleted in the time of choice making, delete it now
        // NOTE Be aware that here, dilemma may no longer be in the state.dilemmas list
        this.setState({ openDilemma: undefined });
    }

    onDilemmaLocationClick(dId) {
        this.openDilemmaPopup(dId);
    }

    onSurpriseDismiss(sId) {
        this.closeDilemma();
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
                        onChooseOption={id => alert("Chose option id " + id)}
                    >test</DilemmaPopup>
                )
            else
                popup = (
                    <SurprisePopup event={dilemma}
                        onClose={this.closeDilemma.bind(this)}
                        onDismiss={this.onSurpriseDismiss.bind(this)}
                    >test</SurprisePopup>
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
