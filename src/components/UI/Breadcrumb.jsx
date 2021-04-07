import React from 'react';
import {NavLink} from "react-router-dom";

function Breadcrumb({routes}) {

  if(!routes.length) return null;

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {
          routes?.map((item, index) => {
            if (index === routes.length - 1) {
              return <li key={`${item.path}-${item.title}`} className="breadcrumb-item active" aria-current="page">{item.title}</li>
            }

            return <li key={item.path} className="breadcrumb-item"><NavLink to={item.path}>{item.title}</NavLink></li>
          })
        }
      </ol>
    </nav>
  );
}

export default Breadcrumb;