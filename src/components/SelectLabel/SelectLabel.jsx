import React from 'react';
import './SelectLabel.sass';
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

function SelectLabel({title, currentValue, values, names, entity, onChange, error}) {
  const {currentUser} = useSelector(({user}) => user);

  const handleChange = (e) => {
    onChange(entity, e.target.value);
  }

  return (
    <div className="select-label">
      <div className="select-label-title">{title}</div>
      <div className="select-label-value">
        <select
            name={title}
            className="form-control"
            onChange={handleChange}
            value={currentValue}
            defaultValue={currentValue ? undefined : 'DEFAULT'}
            disabled={!(currentUser && currentUser.priority < 2)}
          >

            {!currentValue && <option value="DEFAULT" disabled>Выберите из списка ...</option>}
            {values.map((value, index) => {
                return <option
                  key={value}
                  value={value}
                >{names[index]}</option>
              }
            )}
          </select>

        {error && <div className="error-message">{error}</div> }
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