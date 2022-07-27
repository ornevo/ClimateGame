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

    let classHover = (pathname === '/play' ) ? 'display-footer' : ''
    let iconHover = !isShowTerm ? 'footer-nav-link' : ''
    
    return (
            <footer className={`footer-container flex flex-column ${classHover}`}>
            <div className="footer-links">
                <ul className="footer-nav flex clean-list">
                    <li className="footer-nav-link">{((pathname !== '/')) ?
                        <NavLink to="/"><HomeIcon /></NavLink>
                        : <NavLink to="/about"><AboutIcon /></NavLink>}</li>
                    <li className={`${iconHover}`} ref={termRef} onClick={onToggleTerm}>
                            {isShowTerm && <TermPopup showTerm={isShowTerm} closeTerm={onCloseTerm} />}
                        <TermIcon />
                    </li>
                    <li className="footer-nav-link"><NavLink to="/stats"><StatisticsIcon /></NavLink></li>
                    <li className="footer-nav-link"><NavLink to="/score"><HighScoreIcon /></NavLink></li>
                </ul>
            </div>
        </footer>
    )
}