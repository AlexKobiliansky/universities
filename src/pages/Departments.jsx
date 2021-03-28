import React, {useEffect, useState} from 'react';
import DepartmentsList from "../components/DepartmentsList";
import {departmentsAPI} from "../api/api";

function Departments() {

  let [departments, setDepartments] = useState(null);

  useEffect(() => {
    departmentsAPI.getDepartments().then(({data}) => {
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