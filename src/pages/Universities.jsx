import React, {useEffect, useState} from 'react';
import UniversitiesList from "../components/UniversitiesList";
import { universitiesAPI } from '../api/api'
import {Link} from "react-router-dom";

function Universities() {
  const [loading, setLoading] = useState(true)
  let [universities, setUniversities] = useState(null);

  useEffect(() => {
    universitiesAPI.getUniversities().then(({data}) => {
      setUniversities(data);
      setLoading(false)
    });
  }, []);

  return (
    <>
      <h1>Университеты</h1>

      {<UniversitiesList items={universities} loading={loading} />}
      <div className="add-line">
        <Link to="/add/university" className="btn btn-primary">Добавить новый университет</Link>
      </div>
    </>
  );
}

export default Universities;