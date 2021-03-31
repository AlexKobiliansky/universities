import React from 'react';
import PropTypes from "prop-types";
import './InfoLabel.sass';
import classnames from "classnames";

function AddInfoLabel({title, inputName, handleBlur, handleChange, value, error}) {
  return (
    <div className={classnames('info-label', 'info-label-add', { 'has-error': error })}>
      <div className="info-label-title">{title}:</div>
      <div className="info-label-value">
        <input
            name={inputName}
            type="text"
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        {error && <div className="error-message">{error}</div> }
      </div>
    </div>
  );
}

AddInfoLabel.propTypes = {
  title: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
}

export default AddInfoLabel;