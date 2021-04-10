import React from 'react';
import './SelectLabel.sass';
import PropTypes from "prop-types";

function SelectLabel({title, currentValue, values, names, entity, onChange}) {

  const handleChange = (e) => {
    onChange(entity, e.target.value);
  }

  return (
    <div className="select-label">
      <div className="select-label-title">Название</div>
      <div className="select-label-value">
        <select name={title} className="form-control" onChange={handleChange} value={currentValue}>
          {values.map((value, index) => {
              return <option key={value} value={value}>{names[index]}</option>
            }
          )}
        </select>
      </div>
    </div>
  );
}

SelectLabel.propTypes = {
  title: PropTypes.string.isRequired,
  currentValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  values: PropTypes.array,
  names: PropTypes.array,
  entity: PropTypes.string.isRequired,
  onChange: PropTypes.func
}

export default SelectLabel;