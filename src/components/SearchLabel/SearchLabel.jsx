import React from 'react';
import PropTypes from "prop-types";
import './SearchLabel.sass'

function SearchLabel({placeholder, onInput, currValue}) {
  return (
    <label className="search-label">
      <div className="input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="bi bi-search" />
          </div>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          onChange={onInput}
          value={currValue}
        />
      </div>

    </label>
  );
}

SearchLabel.propTypes = {
  placeholder: PropTypes.string,
  currValue: PropTypes.string,
  onInput: PropTypes.func.isRequired
}

export default SearchLabel;