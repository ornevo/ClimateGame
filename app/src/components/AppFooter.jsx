import React from 'react';
import { InfoIcon, HomeIcon, StatisticsIcon, AboutIcon } from '../features/svg.services.js'
import { useLocation, NavLink } from 'react-router-dom'


export const AppFooter = () => {
    const { pathname } = useLocation()

    return (
        <footer className="footer-container">
            <div className="footer-links">
                <ul className="footer-nav flex clean-list">
                    <li>{((pathname !== '/')) ?
                        <NavLink to="/" className="footer-nav-link"><HomeIcon /></NavLink>
                        : <NavLink to="/about" className="footer-nav-link"><AboutIcon /></NavLink>}</li>
                    <li><InfoIcon /></li>
                    <li><StatisticsIcon /></li>
                </ul>
            </div>
        </footer>
    )
}


