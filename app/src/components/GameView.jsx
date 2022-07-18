import React from 'react';
import Map from './Map';
import Menu from './menu/Menu';
import Popup from "./popups/Popup";
import QuestionPopup from './popups/QuestionPopup';
import './GameView.css';
import Constants from "../constants";

const DEMO_OPTION = {
    ID: 2,
    content: "תוכן האפשרות",
    effect: {
        money_delta: 100,
        emissions_delta: 10,
        life_quality_delta: 11,
        money_delta_per_tick: 2,
        emissions_delta_per_tick: 2,
        life_quality_delta_per_tick: 2,
        ticks_amount: 5
    }
};
const DEMO_QUESTION = {
    is_good: false,
    ID: 2,
    title: "כותרת השאלה",
    description: "תיאור תיאור תיאור",
    placement: 4,
    category: 4,
    unhandled_money_delta: 10,
    unhandled_emissions_delta: 12,
    unhandled_life_quality_delta: 14,
    options: [DEMO_OPTION, {...DEMO_OPTION, ID: 3}, {...DEMO_OPTION, ID: 4}]
}


export default class GameView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dilemmas: [
                {_id: "testid", lifetime: 15, placement: 2, isDeleted: false}
            ],
            effects: [
                {_id: "etestod", x: 10, y: 2, placement: 4, delay: 2 + 5 + Constants.DILEMMA_LOCATION_DESTRUCT_ANIMATION_TIME, amount: 4, metric: Constants.MONEY_METRIC}
            ],
            emissions: Constants.INITIAL_EMISSIONS,
            money: Constants.INITIAL_MONEY,
            qof: Constants.INITIAL_QUALITY_OF_LIFE,
            year: Constants.INITIAL_YEAR,
            popup: undefined
        }

        // for testing
        setTimeout(() => {
            this.removeDilemma("testid")
        }, 15000);


        setTimeout(() => {
            this.setState({
                dilemmas: [...this.state.dilemmas, {_id: "testid2", lifetime: 5, placement: 4, isDeleted: false}]
            })
            setTimeout(() => {
                this.removeDilemma("testid2")
            }, 3000);
        }, 3000);
    }

    removeDilemma(dilemmaId) {
        // We first change it to deleted, then wait for animation finish, then really delete
        var newDilemmasState = this.state.dilemmas.map(d => d._id === dilemmaId ? {...d, isDeleted: true} : d);
        this.setState({dilemmas: newDilemmasState}, () => {
            // Now wait for the destruction to finish
            setTimeout(() => {
                newDilemmasState = this.state.dilemmas.filter(d => d._id !== dilemmaId);
                this.setState({dilemmas: newDilemmasState});
            }, Constants.DILEMMA_LOCATION_DESTRUCT_ANIMATION_TIME * 1000);
        })
    }

    removeEffect(effectId) {
        var newEffectsState = this.state.effects.filter(e => e._id !== effectId);
        this.setState({effects: newEffectsState});
    }

    render() {
        const popupOpen = this.state.popup !== undefined;
        return (
            <div id="game-view-container">
                {/* <QuestionPopup event={DEMO_QUESTION}
                                onClose={_ => alert("Closed")}
                                onChooseOption={id => alert("Chose option id " + id)}
                >test</QuestionPopup> */}
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

    onDilemmaLocationClick(dId) {
        alert("Clicked on dilemma " + dId);
    }
}
