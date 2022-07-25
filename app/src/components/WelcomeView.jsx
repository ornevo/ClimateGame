import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';


function WelcomeView(props) {
    return (
        <div>
            <h1>TEST</h1>
            <Link to="/play">Go to game</Link>
        </div>
    )
}


export default WelcomeView;