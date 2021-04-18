import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import DeleteButton from "../UI/DeleteButton";
import {useDispatch, useSelector} from "react-redux";
import Pagination from "../UI/Pagination";
import Spinner from "../UI/Spinner";
import Popup from "../UI/Popup";
import {deleteDepartment} from "../../redux/actions/department";
import {Link} from "react-router-dom";
import classnames from "classnames";

const TITLE = 'title';
const ALIAS = 'alias';

function DepartmentsList({items, loading}) {
  const dispatch = useDispatch();
  const {currentUser} = useSelector(({user}) => user);

  const [departments, setDepartments] = useState(items);
  const [isOpenedPopup, setIsOpenedPopup] = useState(false);
  const [selectedItem, setSelecetedItem] = useState(null);
  const [pageOfItems, setPageOfItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const [sortBy, setSortBy] = useState(null);
  const [sortOrderASC, setSortOrderASC] = useState(true);

  useEffect(() => {
    setDepartments(items);
  }, [items]);

  useEffect(() => {
    switch (sortBy) {
      case TITLE:
        sortOrderASC
          ? departments.sort((a, b) => b.title < a.title ? 1 : -1)
          : departments.sort((a, b) => b.title > a.title ? 1 : -1);
        break;
      case ALIAS:
        sortOrderASC
          ? departments.sort((a, b) => b.university.alias < a.university.alias ? 1 : -1)
          : departments.sort((a, b) => b.university.alias > a.university.alias ? 1 : -1);
        break;
      default:
        return
    }

    setDepartments([...departments]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, sortOrderASC])

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

  const handleSort = (sortEntity) => {
    sortEntity !== sortBy ? setSortOrderASC(true) : setSortOrderASC(!sortOrderASC);
    setSortBy(sortEntity);
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
              <th scope="col"
                  onClick={() => handleSort(TITLE)}
                  className={classnames('sorting-head', {'sorting': sortBy === TITLE}, {'desc': !sortOrderASC})}
              >Название</th>
              <th scope="col"
                  onClick={() => handleSort(ALIAS)}
                  className={classnames('sorting-head', {'sorting': sortBy === ALIAS}, {'desc': !sortOrderASC})}
              >Университет</th>
              <th />
            </tr>
            </thead>
            <tbody>

            {pageOfItems?.map((item, index) => (
              <tr key={item.id}>
                <th scope="row">{(index+1) + ((currentPage-1)*pageSize)}</th>
                <td><Link to={`/department/${item.id}`} dangerouslySetInnerHTML={{__html: item.title}} /></td>
                <td dangerouslySetInnerHTML={{__html: item.university?.alias}} />
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