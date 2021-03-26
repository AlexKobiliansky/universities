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
        <div className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Поиск" aria-label="Поиск" />
          <button className="btn btn-info my-2 my-sm-0" type="submit">Поиск</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;