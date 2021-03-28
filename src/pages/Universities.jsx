import React, {useEffect, useState} from 'react';
import UniversitiesList from "../components/UniversitiesList";
import { universitiesAPI } from '../api/api'

function Universities() {
  let [universities, setUniversities] = useState(null);

  useEffect(() => {
    universitiesAPI.getUniversities().then(({data}) => {
      setUniversities(data)
    });
  }, []);

  return (
    <>
      <h1>Университеты</h1>

      {<UniversitiesList items={universities} />}
    </>
  );
}

export default Universities;