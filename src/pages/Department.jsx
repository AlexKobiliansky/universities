import React from 'react';
import {useParams} from "react-router-dom";

function Department() {
  const departmentId = useParams().id;
  return (
    <div>Факультет: {departmentId}</div>
  );
}

export default Department;