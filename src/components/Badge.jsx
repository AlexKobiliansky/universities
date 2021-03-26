import React from 'react';

function Badge({img, label}) {
  return (
    <div className="Badge" style={{backgroundImage: img}}>
      {img ? <img src={img} alt={label} /> : <span>{label}</span>}

    </div>
  );
}

export default Badge;