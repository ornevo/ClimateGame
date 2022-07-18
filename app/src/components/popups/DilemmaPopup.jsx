import React from 'react';
import PropTypes from 'prop-types';
import Popup from './Popup';
import Constants from "../../constants";
import DilemmaOption from './DilemmaOption';


function DilemmaPopup(props) {
    const q = props.event;
    return (
        <Popup onClose={props.onClose}>
            {/* Title */}
            <div className="q-title">
                <img className="q-category-icon" src={Constants.CATEGORY_TO_IMG[q.category]} />
                <span>{q.title}</span>                
            </div>

            <hr/>

            {/* Content */}
            <div className="text">
                {q.description}
            </div>

            {/* Options */}
            <div>
                {props.event.options.map(option => 
                    <DilemmaOption option={option} onClick={props.onChooseOption}/>
                )}
            </div>
        </Popup>
    )
}

DilemmaPopup.propTypes = {
    onClose: PropTypes.func.isRequired,
    onChooseOption: PropTypes.func.isRequired, // called with option id
    children: PropTypes.object.isRequired,
    event: PropTypes.object.isRequired // the event obejct as described in JSON.txt file
}


export default DilemmaPopup;