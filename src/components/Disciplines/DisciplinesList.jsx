import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../UI/Spinner";
import {Link} from "react-router-dom";
import DeleteButton from "../UI/DeleteButton";
import Pagination from "../UI/Pagination";
import Popup from "../UI/Popup";

function DisciplinesList({items, loading}) {
  const dispatch = useDispatch();
  const {currentUser} = useSelector(({user}) => user);

  const [disciplines, setDisciplines] = useState(items);
  const [isOpenedPopup, setIsOpenedPopup] = useState(false);
  const [selectedItem, setSelecetedItem] = useState(null);
  const [pageOfItems, setPageOfItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  useEffect(() => {
    setDisciplines(items);
  }, [items]);

  let onChangePage = (pageOfItems, pageNumber) => {
    setPageOfItems(pageOfItems);
    setCurrentPage(pageNumber);
  }

  let handleClickDelete = id => {
    console.log('Удалить дисциплину', id);
  }

  const closePopup = () => {
    setIsOpenedPopup(false);
  }

  const openPopup = item => {
    setSelecetedItem(item);
    setIsOpenedPopup(true);
  }

  return (
    <>
      {loading
        ? <Spinner/>
        : <>
          <table className="table table-hover table-striped">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Название дисциплины</th>
              <th scope="col">Преподаватели</th>
              <th />
            </tr>
            </thead>
            <tbody>

            {pageOfItems?.map((item, index) => (
              <tr key={item.id}>
                <th scope="row">{(index+1) + ((currentPage-1)*pageSize)}</th>
                <td><Link to={`/discipline/${item.id}`}>{item.title}</Link></td>
                <td>Список преподавателей</td>
                <td>
                  {currentUser && currentUser.priority < 2 &&
                  <DeleteButton onClick={() => openPopup(item)}/>
                  }
                </td>
              </tr>
            ))}
            </tbody>
          </table>

          <Pagination items={disciplines} onChangePage={onChangePage} pageSize={pageSize}/>
        </>}

      {isOpenedPopup &&
      <Popup
        onClose={closePopup}
        title="Подтверждение удаления"
        text={`Вы действительно хотите удалить дисциплину "${selectedItem.title}"? Эту операцию невозможно будет отменить!`}
        confirmFunc={() => handleClickDelete(selectedItem.id)}
      />}
    </>
  );
}

DisciplinesList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool
}

export default DisciplinesList;