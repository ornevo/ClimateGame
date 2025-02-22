import React from 'react'
import PropTypes from 'prop-types'
import Popup from './Popup'
import Constants from "../../constants"
import DilemmaOption from './DilemmaOption'
import ContentText from './ContentText'
import Backend from '../../backend/backend'

function DilemmaPopup(props) {
    const q = props.event
    return (
        <Popup onClose={props.onClose}>
            {/* Title */}
            <div className="q-title">
                <img className="q-category-icon" src={Constants.CATEGORY_TO_IMG[q.category]} alt=""/>
                <span>{q.title}</span>                
            </div>
            <hr/>

            {/* Content */}
            <ContentText qId={q.ID}>{q.description}</ContentText>

            {/* Options */}
            <div>
                {props.event.option_ids.map(optionId => 
                    <DilemmaOption key={'option_' + optionId} option={Backend.getOption(optionId)} onClick={props.onChooseOption}/>
                )}
            </div>
        </Popup>
    )
}

DilemmaPopup.propTypes = {
    onClose: PropTypes.func.isRequired,
    onChooseOption: PropTypes.func.isRequired, // called with option id
    event: PropTypes.object.isRequired // the event obejct as described in JSON.txt file
}

export default DilemmaPopup