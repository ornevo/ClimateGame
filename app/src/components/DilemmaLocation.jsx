import React from 'react';
import PropTypes from 'prop-types';


function DilemmaLocation(props) {
    console.log('rendered, props delted: ' + props.isDeleted);
    return (
        <div className="dilemma-location" onClick={_ => props.onClick(props.dilemmaId)} style={{
            top: props.y + "px",
            left: props.x + "px",
        }}>
            <img className={'location-pin-img' + (props.isDeleted ? ' location-deleted' : '')}
                src="location-pin.svg" style={{
                animationName: props.isDeleted ? "location-pin-disappear" : "location-pin-appear"
            }} />
            <div className={'progress-bar-container' + (props.isDeleted ? ' location-deleted' : '')}
                style={{
                animationName: props.isDeleted ? "bar-container-disappear" : "bar-container-appear"
            }}>
                <span className="progress-bar-inner" style={{
                    animationDuration: props.lifetime + 's',
                }}></span>
            </div>
        </div>
    )
}


DilemmaLocation.propTypes = {
    x: PropTypes.number.isRequired, // The x offset from the parent area
    y: PropTypes.number.isRequired, // The y offset from the parent area
    lifetime: PropTypes.number.isRequired, // The number of seconds until this dilemma expires
    dilemmaId: PropTypes.string.isRequired, // The dilemma id to be passed to callback
    isDeleted: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired, // Parameter is dilemmaId
}


export default DilemmaLocation;