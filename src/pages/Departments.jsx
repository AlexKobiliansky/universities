import React, {useEffect, useState} from 'react';
import DeleteButton from "../components/DeleteButton";
import axios from "axios";

function Departments() {

  let [departments, setDepartments] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/departments?_expand=university').then(({data}) => {
      setDepartments(data)
    });
  }, []);

  let handleClickDelete = (id) => {
    console.log('delete department: ', id);
  }

  return (
    <>
      <h1>Факультеты</h1>

      <table className="table table-hover table-striped">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Название</th>
          <th scope="col">Университет</th>
          <th />
        </tr>
        </thead>
        <tbody>

        {departments?.map((item, index) => (
            <tr key={item.id}>
              <th scope="row">{index+1}</th>
              <td>{item.title}</td>
              <td>{item.university.alias}</td>
              <td>
                <DeleteButton onClick={() => handleClickDelete(item.id)}/>
              </td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </>
  );
}

export default Departments;