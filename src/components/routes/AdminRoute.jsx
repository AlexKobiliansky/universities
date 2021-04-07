import React, {useState} from 'react';
import {Route, Redirect} from "react-router-dom";

function AdminRoute({path, component: Component}) {
  const [userData] = useState(JSON.parse(localStorage.getItem("userData")));

  return (
    <Route
      path={path}
      render={props => (
        userData && userData.priority < 2 ?
          <Component {...props} /> :
          <Redirect to='/' />
      )}
    />
  );
}

export default AdminRoute;