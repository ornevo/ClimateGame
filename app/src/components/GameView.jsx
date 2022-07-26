import React from 'react';
import Map from './Map';
import Menu from './menu/Menu';
import DilemmaPopup from './popups/DilemmaPopup';
import SurprisePopup from './popups/SurprisePopup';
import Utils from "../utils";
import Constants from "../constants";
import Backend from '../backend/backend';


export default class GameView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dilemmas: [],
            effects: [
                {ID: "etestod", x: 10, y: 2, placement: 4, delay: 2 + 5 + Constants.DILEMMA_LOCATION_DESTRUCT_ANIMATION_TIME, amount: 4, metric: Constants.MONEY_METRIC}
            ],
            emissions: Constants.INITIAL_EMISSIONS,
            money: Constants.INITIAL_MONEY,
            qof: Constants.INITIAL_QUALITY_OF_LIFE,
            year: Constants.INITIAL_YEAR,
            openDilemma: undefined // Constants.DILEMMAS[0].ID
        }
    }

    componentDidMount() {
        // Start game loop
        this.gameLoopTick();
    }

    // This is called every game tick
    gameLoopTick() {
        const newState = Backend.getState();
        setTimeout(this.gameLoopTick.bind(this), Constants.GAME_TICK_SECONDS * 1000);
    }

    addDilemmas(dilemmaIds) {
        const dilemmasToAdd = dilemmaIds.map(dId => {
            const dilemma = Constants.DILEMMAS.find(d => d.ID === dId);
            const area = Constants.AREAS[dilemma.placement - 1];
            // Calculate random location within area
            const relativeX = Utils.random(0, area.w - Constants.DILEMMA_LOCATION_W);
            const relativeY = Utils.random(0, area.y - Constants.DILEMMA_LOCATION_H);
            return {ID: dId, x: relativeX, y: relativeY, isDeleted: false};
        })
        let newDilemmas = [...this.state.dilemmas, ...dilemmasToAdd];
        this.setState({dilemmas: newDilemmas}, () => {
            // Now add timeouts
            // TODO: Consider in the future doing this a scheduling mechanism based on ticks, linear
            dilemmaIds.forEach(dId => {
                const d = Utils.getDilemma(dId);
                if(!d) return;
                setTimeout(() => this.removeDilemma(dId), d.lifetime * 1000);
            });
        })

    }

    addSurprise(surpriseDilemmaId) {
        // const surprise = Constants.DILEMMAS.find(d => d.ID === dId);
        this.openDilemmaPopup(surpriseDilemmaId);
    }

    openDilemmaPopup(dilemmaId) {
        if(this.state.openDilemma !== undefined) {
            console.log("WARNING: tried to open a surprise while already has an open one. ignoring.");
            return;
        }
        this.setState({openDilemma: dilemmaId});
    }


    removeDilemma(dilemmaId) {
        // We first change it to deleted, then wait for animation finish, then really delete
        // TODO Fix effect jumping app when location disappears
        // TODO dont delete as long as dilemma in openDillema? just delete when unsetting it

        var newDilemmasState = this.state.dilemmas.map(d => d.ID === dilemmaId ? {...d, isDeleted: true} : d);
        this.setState({dilemmas: newDilemmasState}, () => {
            // Now wait for the destruction to finish
            setTimeout(() => {
                newDilemmasState = this.state.dilemmas.filter(d => d.ID !== dilemmaId);
                this.setState({dilemmas: newDilemmasState});
            }, Constants.DILEMMA_LOCATION_DESTRUCT_ANIMATION_TIME * 1000);
        })
    }

    removeEffect(effectId) {
        var newEffectsState = this.state.effects.filter(e => e.ID !== effectId);
        this.setState({effects: newEffectsState});
    }

    closeDilemma() {
        // If deleted in the time of choice making, delete it now
        // NOTE Be aware that here, dilemma may no longer be in the state.dilemmas list
        this.setState({openDilemma: undefined});
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
            const dilemma = Constants.DILEMMAS.find(q => q.ID === this.state.openDilemma);
            // Check if dillema or surprise
            if(dilemma.options.length > 0)
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
