import React from 'react';
import PropTypes from 'prop-types';
import Popup from './Popup';
import Constants from "../../constants";
import MetricValue from "../MetricValue";

function SurprisePopup(props) {
    const q = props.event;
    let value = 0;
    let metric = -1;
    if(props.event.unhandled_money_delta) {
        value = props.event.unhandled_money_delta;
        metric = Constants.MONEY_METRIC;
    } else if(props.event.unhandled_emissions_delta) {
        value = props.event.unhandled_emissions_delta;
        metric = Constants.EMISSIONS_METRIC;
    } else {
        value = props.event.unhandled_life_quality_delta;
        metric = Constants.QOF_METRIC;
    }
    return (
        <Popup>
            {/* Title */}
            <img className="surprise-icon" src={Constants.CATEGORY_TO_IMG[q.category]} />
            <div className="surprise-title">
                {q.title}
            </div>

            <hr/>

            {/* Content */}
            <div className="text">
                {q.description}
            </div>

            <div className="surprise-accept-button" onClick={props.onDismiss}>
                <div>
                    <div className="surprise-accept-button-text">
                        קיבלתי
                    </div>
                    <MetricValue value={value}
                                colorWhite={true} small={false}
                                metric_const={metric}/>
                </div>
            </div>
        </Popup>
    )
}

SurprisePopup.propTypes = {
    onDismiss: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired // the event obejct as described in JSON.txt file
}


export default SurprisePopup;