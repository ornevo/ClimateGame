import React from 'react';
import PropTypes from 'prop-types';
import Constants from "../constants";


function delta_to_string(v) {
    if(v > 0) return '+' + v;
    return v;
}

function MetricValue(props) {

    return (
        <div className="metric-value">
            <img src={Constants.METRIC_TO_IMG[props.metric_const]}/>
            <div>{delta_to_string(props.value)}</div>
        </div>
    )
}

MetricValue.propTypes = {
    value: PropTypes.number.isRequired,
    metric_const: PropTypes.number.isRequired, // e.g. Constants.QOF_METRIC
}


export default MetricValue;