import React from 'react';
import Map from './Map';
import styles from './GameView.css';

export default class GameView extends React.Component {
    render() {
        var dilemmas = [
            {_id: "testid", lifetime: 5, placement: 2}
        ]
        return (
            <div id="game-view-container">
                <Map dilemmas={dilemmas} onDilemmaLocationClick={this.onDilemmaLocationClick.bind(this)} />
            </div>
        );
    }

    onDilemmaLocationClick(dId) {
        alert("Clicked on dilemma " + dId);
    }
}
