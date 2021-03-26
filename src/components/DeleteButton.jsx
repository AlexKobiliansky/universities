import React from 'react';

function DeleteButton({onClick}) {
  return (
    <button type="button" className="close" aria-label="Закрыть" onClick={onClick}>
      <span aria-hidden="true">&times;</span>
    </button>
  );
}

export default DeleteButton;