import React from 'react';
import PropTypes from "prop-types";

function Popup({title, text, onClose, confirmFunc}) {
  return (
    <div className="popup-overlay">
      <div className="popup" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {text}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onClose}>Отмена</button>
              <button type="button" className="btn btn-primary" onClick={confirmFunc}>Подтвердить действие</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Popup.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  confirmFunc: PropTypes.func.isRequired
}

Popup.defaultProps = {
  title: "Подтвердите действие",
  text: "Выполнить",
};

export default Popup;