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

import { Switch, Route, Redirect } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setUser} from "./redux/reducers/userReducer";
import NoAuthRoute from "./components/routes/NoAuthRoute";
import AdminRoute from "./components/routes/AdminRoute";
import Department from "./pages/Department";
import AddDepartment from "./pages/AddDepartment";
import Main from "./pages/Main";
import Disciplines from "./pages/Disciplines";
import Discipline from "./pages/Discipline";
import AddDiscipline from "./pages/AddDiscipline";
import Student from "./pages/Student";
import AddStudent from "./pages/AddStudent";
import Teacher from "./pages/Teacher";
import AddTeacher from "./pages/AddTeacher";

function App() {
  const dispatch = useDispatch();
  const [userData] = useState(JSON.parse(localStorage.getItem("userData")));

  useEffect(() => {
    userData && dispatch(setUser(userData)); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
      <Navbar />
      <div className="page-wrapper">
        <div className="container">
          <Switch>
            <Route path="/" component={Main} exact />
            <Route path="/universities" component={Universities} exact />
            <Route path="/departments" component={Departments} />
            <Route path="/students" component={Students} />
            <Route path="/teachers" component={Teachers} />
            <Route path="/disciplines" component={Disciplines} />
            <Route path="/university/:id" component={University} exact/>
            <Route path="/department/:id" component={Department} exact/>
            <Route path="/discipline/:id" component={Discipline} exact/>
            <Route path="/student/:id" component={Student} exact/>
            <Route path="/teacher/:id" component={Teacher} exact/>
            <NoAuthRoute path='/login' component={Login} />
            <NoAuthRoute path='/registration' component={Registration} />
            <AdminRoute path="/add/university" component={AddUniversity} />
            <AdminRoute path="/add/department" component={AddDepartment} />
            <AdminRoute path="/add/discipline" component={AddDiscipline} />
            <AdminRoute path="/add/student" component={AddStudent} />
            <AdminRoute path="/add/teacher" component={AddTeacher} />
            <Redirect to='/'/>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
