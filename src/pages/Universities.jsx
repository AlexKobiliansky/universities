import React, {useEffect, useState} from 'react';
import UniversitiesList from "../components/UniversitiesList";
import { universitiesAPI } from '../api/api'

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
    </>
  );
}

export default Universities;