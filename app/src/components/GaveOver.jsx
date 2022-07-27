import React, { useEffect, useState, useRef } from 'react'
// import { Link } from "react-router-dom";
import { NavLink } from 'react-router-dom'
// import {MoreInfo} from '../components/MoreInfo.jsx'

export const GaveOver = () => {
    return (
        <section className="game-over-container flex flex-column">
                <div className="map-homepage">
                    <img className="map" src="https://res.cloudinary.com/dcbbqlssh/image/upload/v1658829163/ClimateGame/Untitled-Artwork_4_gupzji.png" alt="Israel-Map" />
                </div>
                <button className="game-over-continue">
                    <NavLink to='/more-info' className="game-over-link">המשך</NavLink>
                    </button>
        </section>
    )
}
