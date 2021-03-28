import React, {useEffect, useState} from 'react';
import axios from "axios";
import DepartmentsList from "../components/DepartmentsList";

function Departments() {

  let [departments, setDepartments] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/departments?expand=university').then(({data}) => {
      setDepartments(data)
    });
  }, []);

  return (
    <>
      <h1>Факультеты</h1>

      <DepartmentsList items={departments} />
    </>
  );
}

export default Departments;