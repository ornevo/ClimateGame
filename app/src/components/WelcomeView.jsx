import React from 'react';
import { Link } from "react-router-dom";
import { InfoIcon } from "../features/svg.services.js"

function WelcomeView() {
    return (
        <section>
            <div className="app-homepage">
                <div className="map-homepage">
                    <img className="map" src="https://res.cloudinary.com/dcbbqlssh/image/upload/v1658829163/ClimateGame/Untitled-Artwork_4_gupzji.png" alt="Israel-Map" />
                </div>
                <div className="logo">
                    <img src="https://res.cloudinary.com/dcbbqlssh/image/upload/v1658829163/ClimateGame/%D7%9C%D7%95%D7%92%D7%95_%D7%9E%D7%A9%D7%97%D7%A7_%D7%94%D7%90%D7%A7%D7%9C%D7%99%D7%9D_%D7%A6%D7%91%D7%A2%D7%95%D7%A0%D7%99_%D7%9E%D7%A1%D7%92%D7%A8%D7%AA_%D7%A8%D7%A7%D7%A2_%D7%A9%D7%A7%D7%95%D7%A3_jgikhb.png" alt="logo" />
                </div>
                <button className="start-game">
                    <Link to="/play"></Link>התחל משחק
                </button>
                {/* <button className="info-terms">
                    <InfoIcon />
                </button> */}
            </div>
        </section>
    )
}

export default WelcomeView;