import React, {useEffect, useState} from 'react';
import DeleteButton from "../components/DeleteButton";
import axios from "axios";

function Universities() {
  let [universities, setUniversities] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/universities').then(({data}) => {
      setUniversities(data)
    });
  }, []);

  let handleClickDelete = (id) => {
    console.log('delete university: ', id);
  }

  return (
    <>
      <h1>Университеты</h1>

      <table className="table table-hover table-striped">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Название</th>
          <th scope="col">Город</th>
          <th scope="col">Сайт</th>
          <th />
        </tr>
        </thead>
        <tbody>

        {universities?.map((item, index) => (
            <tr key={item.id}>
              <th scope="row">{index+1}</th>
              <td>{item.title}</td>
              <td>{item.city}</td>
              <td><a href={item.site} target="_blank" rel="noreferrer">{item.site}</a></td>
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

export default Universities;