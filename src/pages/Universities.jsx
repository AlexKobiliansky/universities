import React, {useEffect, useState} from 'react';
import axios from "axios";
import UniversitiesList from "../components/UniversitiesList";

function Universities() {
  let [universities, setUniversities] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/universities').then(({data}) => {
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