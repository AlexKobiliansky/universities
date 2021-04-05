import React, {useEffect, useState} from 'react';
import UniversitiesList from "../components/UniversitiesList";
import { universitiesAPI } from '../api/universities'
import {Link, NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

function Universities() {
  const [loading, setLoading] = useState(true)
  const [universities, setUniversities] = useState(null);
  const {currentUser} = useSelector(({user}) => user);

  useEffect(() => {
    universitiesAPI.getUniversities().then(({data}) => {
      setUniversities(data);
      setLoading(false)
    });
  }, []);

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active" aria-current="page">Университеты</li>
        </ol>
      </nav>
      <h1>Университеты</h1>

      {<UniversitiesList items={universities} loading={loading} />}

      {currentUser && currentUser.priority < 2 &&
        <div className="add-line">
          <Link to="/add/university" className="btn btn-primary">Добавить новый университет</Link>
        </div>
      }

    </>
  );
}

export default Universities;