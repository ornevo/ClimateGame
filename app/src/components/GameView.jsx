import React from 'react';
import Map from './Map';
import Menu from './menu/Menu';
import Popup from "./popups/Popup";
import QuestionPopup from './popups/QuestionPopup';
import './GameView.css';
import Constants from "../constants";


export default class GameView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dilemmas: [
                {_id: '2', lifetime: 15, placement: 2, isDeleted: false}
            ],
            effects: [
                {_id: "etestod", x: 10, y: 2, placement: 4, delay: 2 + 5 + Constants.DILEMMA_LOCATION_DESTRUCT_ANIMATION_TIME, amount: 4, metric: Constants.MONEY_METRIC}
            ],
            emissions: Constants.INITIAL_EMISSIONS,
            money: Constants.INITIAL_MONEY,
            qof: Constants.INITIAL_QUALITY_OF_LIFE,
            year: Constants.INITIAL_YEAR,
            openQuestion: Constants.QUESTIONS[0].ID
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

    closeQuestion() {
        this.setState({openQuestion: undefined})
    }

    render() {
        var popup = '';
        if(this.state.openQuestion) {
            const question = Constants.QUESTIONS.find(q => q.ID === this.state.openQuestion);
            popup = (
                <QuestionPopup event={question}
                    onClose={this.closeQuestion.bind(this)}
                    onChooseOption={id => alert("Chose option id " + id)}
                >test</QuestionPopup>
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

    onDilemmaLocationClick(dId) {
        alert("Clicked on dilemma " + dId);
    }
}
