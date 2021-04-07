import React from 'react';

function Spinner() {
  return (
    <div className="spinner">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Загрузка...</span>
      </div>
    </div>
  );
}

export default Spinner;