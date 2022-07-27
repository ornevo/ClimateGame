import React from 'react'
import { NavLink } from 'react-router-dom'

export const GaveOver = () => {
    return (
        <section className="game-over-container flex flex-column">
                <div className="map-homepage">
                <img className="map" src="https://res.cloudinary.com/dcbbqlssh/image/upload/v1658913989/ClimateGame/Untitled-Artwork_njaxgg.png" alt="homepage-background" />
                </div>
                <div className="homepage-content-container flex flex-column">

                <div className="game-over-msg-container">
                    <h1>סיימת את המשחק</h1>
                </div>
                <button className="game-over-continue">
                    <NavLink to='/more-info' className="game-over-link">המשך</NavLink>
                    </button>
                </div>
        </section>
    )
}
