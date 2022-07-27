import React, { useEffect, useState, useRef } from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import { MoreInfoPopup } from './popups/MoreInfoPopup.jsx'

export const MoreInfo = () => {
    const { pathname } = useLocation()
    const [isShowMoreInfo, setIsShowMoreInfo] = useState(false)
    const moreInfoRef = useRef(null)

    useEffect(() => {
        document.addEventListener("click", handleMoreInfoClickOutside)
    }, [isShowMoreInfo])

    const onCloseMoreInfo = () => {
        setIsShowMoreInfo(false)
    }

    const onToggleMoreInfo = (ev) => {
        ev.stopPropagation()
        setIsShowMoreInfo(!isShowMoreInfo)
    }

    const handleMoreInfoClickOutside = (e) => {
        if (moreInfoRef.current && isShowMoreInfo && !moreInfoRef.current.contains(e.target)) onToggleMoreInfo()
    }

    return (
        <section className="more-info-container flex flex-column">
        <div className="map-homepage">
            <img className="map" src="https://res.cloudinary.com/dcbbqlssh/image/upload/v1658913988/ClimateGame/Untitled-Artwork_1_qbqh9p.png" alt="dead-sea" />
        </div>


<button className="more-info-continue" ref={moreInfoRef} onClick={onToggleMoreInfo}>
                            {isShowMoreInfo && <MoreInfoPopup showMoreInfo={isShowMoreInfo} closeMoreInfo={onCloseMoreInfo} />}
                            ועכשיו מה?
                    </button>
   
</section>
    )
}




