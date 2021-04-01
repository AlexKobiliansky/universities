import React from 'react';
import {NavLink} from "react-router-dom";

function Navbar() {
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
          <li className="nav-item">
            <NavLink to="/login" exact className="nav-link" activeClassName="active">Логин</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/registration" exact className="nav-link" activeClassName="active">Регистрация</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;