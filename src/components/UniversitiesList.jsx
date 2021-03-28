import React from 'react';
import Badge from "./Badge";
import {Link} from "react-router-dom";
import DeleteButton from "./DeleteButton";
import PropTypes from "prop-types";

function UniversitiesList({items}) {

  let handleClickDelete = (id) => {
    console.log('delete university: ', id);
  }

  return (
    <table className="table table-hover table-striped">
      <thead>
      <tr>
        <th scope="col" />
        <th scope="col">Название</th>
        <th scope="col">Город</th>
        <th scope="col">Сайт</th>
        <th />
      </tr>
      </thead>
      <tbody>

      {items?.map((item, index) => (
        <tr key={item.id}>
          <td className="align-middle"><Badge label={item.title.charAt(0)} img={item.logoUrl}/></td>
          <td className="align-middle">
            <Link to={`university/${item.id}`}>{item.title}</Link>

          </td>
          <td className="align-middle">{item.city}</td>
          <td className="align-middle"><a href={item.site} target="_blank" rel="noreferrer">{item.site}</a></td>
          <td className="align-middle">
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
  items: PropTypes.arrayOf(PropTypes.object)
}

export default UniversitiesList;