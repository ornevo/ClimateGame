import React from 'react'
import PropTypes from 'prop-types'
import Constants from "../../constants"

function Metric(props) {
    const curr = Math.max(props.min, Math.min(props.max, props.curr))
    let percent = Math.floor(100*((curr - props.min) / (props.max - props.min)))
    const isSmall = props.name !== Constants.YEAR_HEB_NAME

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
                {
                    props.metric_const === Constants.EMISSIONS_METRIC ? 
                    <span style={{
                        width: percent + "%",
                        background: "linear-gradient(90deg, rgba(43,184,18,1) 0%, rgba(249,234,60,1) " + (100 * 50 / percent) + "%, rgba(218,48,48,1) " + (100 * 100 / percent) + "%)"
                    }}></span>
                    :
                    <span style={{width: percent + "%", background: Constants.METRIC_TO_COLOR[props.metric_const]}}></span>
                }
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

export default Metric