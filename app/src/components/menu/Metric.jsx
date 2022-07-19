import React from 'react';
import PropTypes from 'prop-types';
import Constants from "../../constants";
import MetricValue from '../MetricValue';


function Metric(props) {
    const curr = Math.max(props.min, Math.min(props.max, props.curr));
    var precent = Math.floor(100*((curr - props.min) / (props.max - props.min)));
    const isSmall = props.name !== Constants.YEAR_HEB_NAME;

    return (
        <div className={"metric-container" + (isSmall && " metric-container-small")}>
            <span>
                {
                    isSmall ? (
                        <div className="metric-title-container">
                            <div></div>
                            <div>{props.name}</div>
                        </div>
                    ) : (
                        <div className="metric-title-container">
                            <span>{props.max}</span>
                            <span>{props.name}</span>
                            <span>{props.min}</span>
                        </div>
                    )
                }
            </span>
            <div className="metric-bar-container">
                <span style={{width: precent + "%", background: Constants.METRIC_TO_COLOR[props.metric_const]}}></span>
            </div>
        </div>
    )
}


Metric.propTypes = {
    max: PropTypes.number.isRequired,
    curr: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    metric_const: PropTypes.number.isRequired, // e.g. Constants.QOF_METRIC
}


export default Metric;