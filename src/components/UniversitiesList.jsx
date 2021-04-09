import React, {useEffect, useState} from 'react';
import Badge from "./Badge";
import {Link} from "react-router-dom";
import DeleteButton from "./UI/DeleteButton";
import PropTypes from "prop-types";
import Spinner from "./UI/Spinner";
import Popup from "./UI/Popup";
import {useDispatch, useSelector} from "react-redux";
import Pagination from "./UI/Pagination";
import {deleteUniversity} from "../redux/actions/university";

function UniversitiesList({items, loading}) {
  const dispatch = useDispatch();
  const {currentUser} = useSelector(({user}) => user);

  const [universities, setUniversities] = useState(items);
  const [isOpenedPopup, setIsOpenedPopup] = useState(false);
  const [selectedItem, setSelecetedItem] = useState(null);
  const [pageOfItems, setPageOfItems] = useState([]);


  useEffect(() => {
    setUniversities(items);
  }, [items]);

  let onChangePage = (pageOfItems) => {
    setPageOfItems(pageOfItems);
  }

  let handleClickDelete = (id) => {
    dispatch(deleteUniversity(id)).then(() => {closePopup()});
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
        :
        <>
          <table className="table table-hover table-striped">
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

            {pageOfItems?.map(item => (
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
                  {currentUser && currentUser.priority < 2 &&
                  <DeleteButton onClick={() => openPopup(item)}/>
                  }
                </td>
              </tr>
            ))
            }
            </tbody>
          </table>

          <Pagination items={universities} onChangePage={onChangePage} pageSize={10}/>
        </>

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
  items: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool
}

export default UniversitiesList;