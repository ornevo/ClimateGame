import React from 'react'
import PropTypes from 'prop-types'

function ContentText(props) {
    const randomId = props.qId.slice(-1).charCodeAt(0) % 4
    let avatarPath = "/avatar-" + randomId + ".png"
    return (
        <div className="text">
            <img className="avatar" src={avatarPath} alt=""/>
            <div className="text-triangle"></div>
            <div className="text-content">
                {props.children}
            </div>
        </div>
    )
}

ContentText.propTypes = {
    qId: PropTypes.string.isRequired
}

export default ContentText
