import React, {useState} from 'react';
import {Route, Redirect} from "react-router-dom";

function NoAuthRoute({path, component: Component}) {
  const [userData] = useState(JSON.parse(localStorage.getItem("userData")));

  return (
    <Route
      path={path}
      render={props => (
        !userData ?
          <Component {...props} /> :
          <Redirect to='/' />
      )}
    />
  );
}

export default NoAuthRoute;