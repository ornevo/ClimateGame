import React, { useEffect, useState, useRef } from 'react'
import { TermIcon, HomeIcon, StatisticsIcon, AboutIcon, HighScoreIcon } from '../features/svg.services.js'
import { useLocation, NavLink } from 'react-router-dom'
import { TermPopup } from './popups/TermPopup.jsx'


export const AppFooter = () => {
    const { pathname } = useLocation()
    const [isShowTerm, setIsShowTerm] = useState(false)
    const termRef = useRef(null)

    useEffect(() => {
        document.addEventListener("click", handleTermClickOutside)
    }, [isShowTerm])


    const onCloseTerm = () => {
        setIsShowTerm(false)
    }

    const onToggleTerm = (ev) => {
        ev.stopPropagation()
        setIsShowTerm(!isShowTerm)
    }

    const handleTermClickOutside = (e) => {
        if (termRef.current && isShowTerm && !termRef.current.contains(e.target)) onToggleTerm()
    }

    return (
        <footer className="footer-container flex flex-column">
            <div className="footer-links">
                <ul className="footer-nav flex clean-list">
                    <li>{((pathname !== '/')) ?
                        <NavLink to="/" className="footer-nav-link"><HomeIcon /></NavLink>
                        : <NavLink to="/about" className="footer-nav-link"><AboutIcon /></NavLink>}</li>
                    <li ref={termRef} onClick={onToggleTerm}>
                            {isShowTerm && <TermPopup showTerm={isShowTerm} closeTerm={onCloseTerm} />}
                        <TermIcon />
                    </li>
                    <li><NavLink to="/stats" className="footer-nav-link"><StatisticsIcon /></NavLink></li>
                    <li><NavLink to="/score" className="footer-nav-link"><HighScoreIcon /></NavLink></li>
                </ul>
            </div>
        </footer>
    )
}