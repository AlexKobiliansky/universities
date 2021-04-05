import React, {useEffect, useState} from 'react';
import Navbar from "./components/Navbar";
import Universities from "./pages/Universities";
import Departments from "./pages/Departments";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import University from "./pages/University";
import AddUniversity from "./pages/AddUniversity";
import Registration from "./pages/Registration";
import Login from "./pages/Login";

import { Switch, Route } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setUser} from "./redux/reducers/user";

function App() {
  const dispatch = useDispatch();
  const [userData] = useState(JSON.parse(localStorage.getItem("userData")));

  useEffect(() => {
    userData && dispatch(setUser(userData));
  }, [])

  return (
    <div className="App">
      <Navbar />
      <div className="page-wrapper">
        <div className="container">
          <Switch>
            <Route path="/" component={Universities} exact />
            <Route path="/departments" component={Departments} />
            <Route path="/students" component={Students} />
            <Route path="/teachers" component={Teachers} />
            <Route path="/university/:id" component={University} exact/>
            <Route path="/add/university" component={AddUniversity} exact/>
            <Route path="/registration" component={Registration} exact/>
            <Route path="/login" component={Login} exact/>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
