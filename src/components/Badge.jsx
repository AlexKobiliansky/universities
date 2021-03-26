import React from 'react';
import PropTypes from "prop-types";

function Badge({img, label}) {
  return (
    <div className="Badge" style={{backgroundImage: img}}>
      {img ? <img src={img} alt={label} /> : <span>{label}</span>}
    </div>
  );
}

Badge.propTypes = {
  label: PropTypes.string.isRequired,
  img: PropTypes.string,
};

export default Badge;