import React from 'react';
import PropTypes from "prop-types";
import UniversitiesList from "./UniversitiesList";
import DeleteButton from "./DeleteButton";

function DepartmentsList({items, univer}) {
  let handleClickDelete = (id) => {
    console.log('delete department: ', id);
  }

  return (
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

      {items?.map((item, index) => (
        <tr key={item.id}>
          <th scope="row">{index+1}</th>
          <td>{item.title}</td>
          <td>{univer ? univer : item.university?.alias}</td>
          <td>
            <DeleteButton onClick={() => handleClickDelete(item.id)}/>
          </td>
        </tr>
      ))
      }
      </tbody>
    </table>
  );
}

UniversitiesList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  univer: PropTypes.string
}

export default DepartmentsList;