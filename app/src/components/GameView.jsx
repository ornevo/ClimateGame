import React from 'react';
import Map from './Map';
import Menu from './menu/Menu';
import './GameView.css';
import Constants from "../constants";


export default class GameView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dilemmas: [
                {_id: "testid", lifetime: 15, placement: 2, isDeleted: false}
            ],
            emissions: Constants.INITIAL_EMISSIONS,
            money: Constants.INITIAL_MONEY,
            qof: Constants.INITIAL_QUALITY_OF_LIFE,
            year: Constants.INITIAL_YEAR,
        }
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

    render() {
        return (
            <div id="game-view-container">
                <Menu emissions={this.state.emissions} money={this.state.money}
                        qof={this.state.qof} year={this.state.year} />
                <Map dilemmas={this.state.dilemmas}
                    onDilemmaLocationClick={this.onDilemmaLocationClick.bind(this)}/>
            </div>
        );
    }

    onDilemmaLocationClick(dId) {
        alert("Clicked on dilemma " + dId);
    }
}