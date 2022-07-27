import React from 'react'
import PropTypes from 'prop-types'
import Constants from "../../constants"
import MetricValue from '../MetricValue'

function DilemmaOption(props) {

    return (
        <div className="dilemma-option-container" onClick={_ => props.onClick(props.option.ID)}>
            <div>{props.option.content}</div>
            <div className='dilemma-option-effect-container'>
                <MetricValue value={props.option.effect.life_quality_delta}
                            metric_const={Constants.QOF_METRIC}/>
                <MetricValue value={props.option.effect.emissions_delta}
                            metric_const={Constants.EMISSIONS_METRIC}/>
                <MetricValue value={props.option.effect.money_delta}
                            metric_const={Constants.MONEY_METRIC}/>
            </div>
        </div>
    )
}

DilemmaOption.propTypes = {
    onClick: PropTypes.func.isRequired, // Called with option.ID
    option: PropTypes.object.isRequired, // option object as defined in json
}

export default DilemmaOption