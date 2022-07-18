import React from 'react';
import PropTypes from 'prop-types';


function QuestionOption(props) {
    return (
        <div className="question-option-container" onClick={_ => props.onClick(props.option.ID)}>
            <div>{props.option.content}</div>
            <div className='question-option-effect-container'>
                <div>+1</div>
                <div>+1</div>
                <div>+1</div>
            </div>
        </div>
    )
}

QuestionOption.propTypes = {
    onClick: PropTypes.func.isRequired, // Called with option.ID
    option: PropTypes.object.isRequired, // option obejct as defined in json
}


export default QuestionOption;