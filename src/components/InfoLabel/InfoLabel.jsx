import React, {useState} from 'react';
import PropTypes from "prop-types";
import './InfoLabel.sass'
import {useSelector} from "react-redux";

function InfoLabel({title, value, entity, onEdit}) {
  const [active, setActive] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const {currentUser} = useSelector(({user}) => user);

  const activateEditMode = () => {
    setActive(true)
  }

  const deactivateEditMode = () => {
    setActive(false);
    onEdit(entity, inputValue);
  }

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  return (
    <div className="info-label">
      <div className="info-label-title">{title}:</div>
      <div className="info-label-value">
        { !active
          ? value
          : <input
            autoFocus
            type="text"
            value={inputValue}
            onChange={handleChange}
            onBlur={deactivateEditMode}
          /> }

        {currentUser && currentUser.priority < 2 &&
        <div className="info-label-change" onClick={activateEditMode}>
          <i className="bi bi-pencil-square"/>
        </div>
        }
      </div>
    </div>
  );
}

InfoLabel.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.any,
  entity: PropTypes.string.isRequired,
  onEdit: PropTypes.func
}

export default InfoLabel;