import React from 'react';
import PropTypes from 'prop-types';
import Constants from '../constants';


function Effect(props) {
    var animationTime = Constants.EFFECT_ANIMATINO_TIME;

    var color = Constants.METRIC_TO_COLOR[props.metric];

    if(props.delay)
        animationTime += props.delay;
    
    if(props.onFinish)
        setTimeout(() => props.onFinish(props.id), animationTime * 1000);

    var amount = props.amount;
    if(props.amount > 0)
        amount = "+" + amount;

    return (
        <div className="effect" style={{
            color: color,
            left: props.x + "px",
            top: props.y + "px",
        }}>
            <div className="effect-inner" style={{
                animationDelay: (props.delay | "0") + 's',
                animationDuration: Constants.EFFECT_ANIMATINO_TIME + 's'
            }}>
                {amount}
            </div>
        </div>
    )
}


Effect.propTypes = {
    amount: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired, // relative location
    y: PropTypes.number.isRequired, // relative location
    metric: PropTypes.number.isRequired, // from constants
    id: PropTypes.string,
    onFinish: PropTypes.func, // will be called with the id
    delay: PropTypes.number // 
}

Effect.defaultProps = {
    delay: 0
}


export default Effect;