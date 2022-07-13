import React from 'react';
import Map from './Map';
import styles from './GameView.css';

export default class GameView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dilemmas: [
                {_id: "testid", lifetime: 15, placement: 2}
            ]
        }

        setTimeout(() => {
            this.setState({
                dilemmas: [...this.state.dilemmas, {_id: "testid2", lifetime: 5, placement: 4}]
            })
        }, 3000);
    }

    render() {
        return (
            <div id="game-view-container">
                <Map dilemmas={this.state.dilemmas} onDilemmaLocationClick={this.onDilemmaLocationClick.bind(this)} />
            </div>
        );
    }

    onDilemmaLocationClick(dId) {
        alert("Clicked on dilemma " + dId);
    }
}
