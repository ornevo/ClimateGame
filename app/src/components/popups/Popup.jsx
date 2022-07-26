import React from 'react';
import PropTypes from 'prop-types';


function Popup(props) {
    return (
        <div className="popup-container">
            {props.onClose && <div className="popup-back" onClick={props.onClose}></div>}
            <div className="popup" onClick={_=>{}}>
                {props.onClose && <img className="popup-x" src="/x-icon.png" onClick={props.onClose}/>}
                { props.children }
            </div>
        </div>
    )
}

Popup.propTypes = {
    onClose: PropTypes.func,
}


export default Popup;