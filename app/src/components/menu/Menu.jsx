import React from 'react'
import PropTypes from 'prop-types'
import Constants from '../../constants'
import Metric from "./Metric"

function Menu(props) {
    return (
        <div className={"top-menu" + ((props.popupOpen === true) ? " blurred" : "")}>
            <Metric max={Constants.MAX_YEAR} curr={props.year}
                    name={Constants.YEAR_HEB_NAME} min={Constants.MIN_YEAR}
                    metric_const={Constants.YEAR_METRIC} />
            <div className="menu-sub-metrics-container">
                <Metric max={Constants.MAX_QOF} curr={props.qof}
                    name={Constants.QOF_HEB_NAME} min={Constants.MIN_QOF}
                    metric_const={Constants.QOF_METRIC} />
                <Metric max={Constants.MAX_EMISSIONS} curr={props.emissions}
                    name={Constants.EMISSIONS_HEB_NAME} min={Constants.MIN_EMISSIONS} 
                    metric_const={Constants.EMISSIONS_METRIC} />
                <Metric max={Constants.MAX_MONEY} curr={props.money}
                    name={Constants.MONEY_HEB_NAME} min={Constants.MIN_MONEY}
                    metric_const={Constants.MONEY_METRIC} />

            </div>
        </div>
    )
}

Menu.propTypes = {
    emissions: PropTypes.number.isRequired,
    money: PropTypes.number.isRequired,
    qof: PropTypes.number.isRequired, // quality of life
    year: PropTypes.number.isRequired,
    popupOpen: PropTypes.bool,
}

export default Menu