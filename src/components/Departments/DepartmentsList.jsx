import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import DeleteButton from "../UI/DeleteButton";
import {useDispatch, useSelector} from "react-redux";
import Pagination from "../UI/Pagination";
import Spinner from "../UI/Spinner";
import Popup from "../UI/Popup";
import {deleteDepartment} from "../../redux/actions/department";
import {Link} from "react-router-dom";

function DepartmentsList({items, loading}) {
  const dispatch = useDispatch();
  const {currentUser} = useSelector(({user}) => user);

  const [departments, setDepartments] = useState(items);
  const [isOpenedPopup, setIsOpenedPopup] = useState(false);
  const [selectedItem, setSelecetedItem] = useState(null);
  const [pageOfItems, setPageOfItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  useEffect(() => {
    setDepartments(items);
  }, [items]);

  let onChangePage = (pageOfItems, pageNumber) => {
    setPageOfItems(pageOfItems);
    setCurrentPage(pageNumber);
  }

  let handleClickDelete = id => {
    dispatch(deleteDepartment(id)).then(() => {closePopup()});
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
              <th scope="col">Название</th>
              <th scope="col">Университет</th>
              <th />
            </tr>
            </thead>
            <tbody>

            {pageOfItems?.map((item, index) => (
              <tr key={item.id}>
                <th scope="row">{(index+1) + ((currentPage-1)*pageSize)}</th>
                <td><Link to={`/department/${item.id}`}>{item.title}</Link></td>
                <td>{item.university?.alias}</td>
                <td>
                  {currentUser?.priority < 2 &&
                  <DeleteButton onClick={() => openPopup(item)}/>
                  }
                </td>
              </tr>
            ))}
            </tbody>
          </table>

          <Pagination items={departments} onChangePage={onChangePage} pageSize={pageSize}/>
        </> }

      {isOpenedPopup &&
      <Popup
        onClose={closePopup}
        title="Подтверждение удаления"
        text={`Вы действительно хотите удалить факультет "${selectedItem.title}"? Эту операцию невозможно будет отменить!`}
        confirmFunc={() => handleClickDelete(selectedItem.id)}
      />}
    </>);
}

DepartmentsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool
}

export default DepartmentsList;