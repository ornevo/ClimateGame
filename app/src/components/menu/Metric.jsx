import React from 'react';
import PropTypes from 'prop-types';

function Metric(props) {
    return (
        <div>
            unimplemented
        </div>
    )
}


Metric.propTypes = {
    max: PropTypes.number.isRequired,
    curr: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}


export default Menu;