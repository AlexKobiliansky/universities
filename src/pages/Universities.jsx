import React, {useEffect, useState} from 'react';
import UniversitiesList from "../components/UniversitiesList";
import { universitiesAPI } from '../api/universities'
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import Breadcrumb from "../components/UI/Breadcrumb";

function Universities() {
  const [loading, setLoading] = useState(true)
  const [universities, setUniversities] = useState(null);
  const {currentUser} = useSelector(({user}) => user);
  const [breadcrumbRoutes] = useState([{
    path: '/',
    title: 'Университеты'
  }]);

  useEffect(() => {
    universitiesAPI.getUniversities().then(({data}) => {
      setUniversities(data);
      setLoading(false)
    });
  }, []);

  return (
    <>
      <Breadcrumb routes = {breadcrumbRoutes} />
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