import React, {useEffect, useState} from 'react';
import Badge from "./Badge";
import {Link} from "react-router-dom";
import DeleteButton from "./DeleteButton";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import {univerAPI} from "../api/api";
import Popup from "./Popup";

function UniversitiesList({items, loading}) {
  const [universities, setUniversities] = useState(items);
  const [isOpenedPopup, setIsOpenedPopup] = useState(false);
  const [selectedItem, setSelecetedItem] = useState(null);

  useEffect(() => {
    setUniversities(items);
  }, [items]);

  let handleClickDelete = (id) => {
    const newUniversities = universities.filter(item => (item.id !== id));

    univerAPI.deleteUniver(id)
      .catch(() => {
        alert('Не удалось удалить университет');
      })
      .then(() => {
        setUniversities(newUniversities);
        closePopup();
      });
  }

  const closePopup = () => {
    setIsOpenedPopup(false);
  }

  const openPopup = (item) => {
    setSelecetedItem(item);
    setIsOpenedPopup(true);
  }

  return (
    <>
      {loading
        ? <Spinner/>
        : <table className="table table-hover table-striped">
          <thead>
          <tr>
            <th scope="col"/>
            <th scope="col">Название</th>
            <th scope="col">Город</th>
            <th scope="col">Сайт</th>
            <th/>
          </tr>
          </thead>
          <tbody>

          {universities?.map(item => (
            <tr key={item.id}>
              <td className="align-middle">
                <Badge label={item.title.charAt(0)} img={item.logoUrl}/>
              </td>

              <td className="align-middle">
                <Link to={`/university/${item.id}`}>{item.title}</Link>
              </td>

              <td className="align-middle">{item.city}</td>

              <td className="align-middle">
                <a href={item.site} target="_blank" rel="noreferrer">{item.site}</a>
              </td>

              <td className="align-middle">
                <DeleteButton onClick={() => openPopup(item)}/>
              </td>
            </tr>
          ))
          }
          </tbody>
        </table>
      }

      {isOpenedPopup &&
      <Popup
        onClose={closePopup}
        title="Подтверждение удаления?"
        text={`Вы действительно хотите удалить университет "${selectedItem.title}" со всеми факультетами? Эту операцию невозможно будет отменить?`}
        confirmFunc={() => handleClickDelete(selectedItem.id)}
      />}
    </>
  );
}

UniversitiesList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object)
}

export default UniversitiesList;