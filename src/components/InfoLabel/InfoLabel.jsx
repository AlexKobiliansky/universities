import React from 'react';
import PropTypes from "prop-types";
import './InfoLabel.sass'

function InfoLabel({title, value}) {
  return (
    <div className="info-label">
      <div className="info-label-title">{title}:</div>
      <div className="info-label-value">
        {value}
        <div className="info-label-change">
          <i className="bi bi-pencil-square" />
        </div>
      </div>
    </div>
  );
}

InfoLabel.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.any
}

export default InfoLabel;