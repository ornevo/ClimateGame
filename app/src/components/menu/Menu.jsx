import React from 'react';
import PropTypes from 'prop-types';


function Menu(props) {
    return (
        <div className="top-menu">
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