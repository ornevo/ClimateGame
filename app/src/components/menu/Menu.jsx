import React from 'react';
import PropTypes from 'prop-types';
import Constants from '../../constants';
import Metric from "./Metric";


function Menu(props) {
    return (
        <div className="top-menu">
            <Metric max={Constants.MAX_YEAR} curr={props.year}
                    name={Constants.YEAR_HEB_NAME} color="red" icon="$" min={Constants.MIN_YEAR} />
            <div className="menu-sub-metrics-container">
                <Metric max={Constants.MAX_QOF} curr={props.qof}
                    name={Constants.QOF_HEB_NAME} color="blue" icon="♥" min={Constants.MIN_QOF} />
                <Metric max={Constants.MAX_EMISSIONS} curr={props.emissions}
                    name={Constants.EMISSIONS_HEB_NAME} color="black" icon="🌎" min={Constants.MIN_EMISSIONS} />
                <Metric max={Constants.MAX_MONEY} curr={props.money}
                    name={Constants.MONEY_HEB_NAME} color="green" icon="💵" min={Constants.MIN_MONEY} />

            </div>
        </div>
    )
}


Menu.propTypes = {
    emissions: PropTypes.number.isRequired,
    money: PropTypes.number.isRequired,
    qof: PropTypes.number.isRequired, // quality of life
    year: PropTypes.number.isRequired
}


export default Menu;