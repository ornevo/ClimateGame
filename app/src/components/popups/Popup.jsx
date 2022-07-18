import React from 'react';
import PropTypes from 'prop-types';


function Popup(props) {
    return (
        <div className="popup-container">
            <div className="popup-back" onClick={props.onClose}></div>
            <div className="popup" onClick={_=>{}}>
                <img className="popup-x" src="/x-icon.png" onClick={props.onClose}/>
                { props.children }
            </div>
        </div>
    )
}

Popup.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.object.isRequired
}


export default Popup;