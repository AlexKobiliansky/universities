import React from 'react';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {logout} from "../redux/reducers/user";
import { useHistory } from "react-router-dom";

function Navbar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const {currentUser, isAuth} = useSelector(({user}) => user);

  const logOutHandler = () => {
    dispatch(logout());
    history.push('/');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{backgroundColor: '#e3f2fd'}}>
      <div className="container">
        <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink to="/" exact className="nav-link" activeClassName="active">Университеты</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/departments" exact className="nav-link" activeClassName="active">Факультеты</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/students" exact className="nav-link" activeClassName="active">Студенты</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/teachers" exact className="nav-link" activeClassName="active">Преподаватели</NavLink>
            </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          {isAuth
            ? <>
              <li className="nav-item">
                <span className="nav-link">Здравствуйте, {currentUser.login}</span></li>
              <li className="nav-item">
                <a onClick={logOutHandler} className="nav-link" href="#0">Выйти</a>
              </li>
            </>
            : <>
              <li className="nav-item">
                <NavLink to="/login" exact className="nav-link" activeClassName="active">Логин</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/registration" exact className="nav-link" activeClassName="active">Регистрация</NavLink>
              </li>
            </>
          }
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;