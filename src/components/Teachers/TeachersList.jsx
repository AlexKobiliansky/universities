import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import {deleteTeacher} from "../../redux/actions/teacher";
import Spinner from "../UI/Spinner";
import Badge from "../Badge";
import DeleteButton from "../UI/DeleteButton";
import Pagination from "../UI/Pagination";
import Popup from "../UI/Popup";
import {Link} from "react-router-dom";
import classnames from "classnames";

const FIRST_NAME = 'firstName';
const DEPARTMENT = 'department';

function TeachersList({items, loading}) {
  const dispatch = useDispatch();
  const {currentUser} = useSelector(({user}) => user);

  const [teachers, setSTeachers] = useState(items);
  const [isOpenedPopup, setIsOpenedPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [pageOfItems, setPageOfItems] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrderASC, setSortOrderASC] = useState(true);

  useEffect(() => {
    setSTeachers(items);
  }, [items]);

  useEffect(() => {
    switch (sortBy) {
      case FIRST_NAME:
        sortOrderASC
          ? teachers.sort((a, b) => b.firstName < a.firstName ? 1 : -1)
          : teachers.sort((a, b) => b.firstName > a.firstName ? 1 : -1);
        break;
      case DEPARTMENT:
        sortOrderASC
          ? teachers.sort((a, b) => b.department.title < a.department.title ? 1 : -1)
          : teachers.sort((a, b) => b.department.title > a.department.title ? 1 : -1);
        break;
      default:
        return
    }

    setSTeachers([...teachers]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, sortOrderASC])

  let onChangePage = (pageOfItems) => {
    setPageOfItems(pageOfItems);
  }

  let handleClickDelete = id => {
    dispatch(deleteTeacher(id)).then(() => {closePopup()});
  }

  const closePopup = () => {
    setIsOpenedPopup(false);
  }

  const openPopup = item => {
    setSelectedItem(item);
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
              <th scope="col">Фото</th>
              <th scope="col"
                  onClick={() => handleSort(FIRST_NAME)}
                  className={classnames('sorting-head', {'sorting': sortBy === FIRST_NAME}, {'desc': !sortOrderASC})}
              >Имя</th>

              <th scope="col"
                  onClick={() => handleSort(DEPARTMENT)}
                  className={classnames('sorting-head', {'sorting': sortBy === DEPARTMENT}, {'desc': !sortOrderASC})}
              >Факультет</th>
              <th />
            </tr>
            </thead>
            <tbody>

            {pageOfItems?.map(item => (
              <tr key={item.id}>
                <td>
                  <Badge
                    label={item.firstName.charAt(0)}
                    img={item.avatarUrl}
                  />
                </td>
                <td className="align-middle">
                  <Link to={`/teacher/${item.id}`} dangerouslySetInnerHTML={{__html: `${item.firstName} ${item.lastName}`}} />
                </td>
                <td className="align-middle" style={{'maxWidth': 250}}>
                  {item.department &&
                  <Link to={`/department/${item.department?.id}`} dangerouslySetInnerHTML={{__html: item.department?.title}} />}
                </td>
                <td className="align-middle">
                  {currentUser?.priority < 2 &&
                  <DeleteButton onClick={() => openPopup(item)}/>
                  }
                </td>
              </tr>
            ))
            }
            </tbody>
          </table>

          <Pagination items={teachers} onChangePage={onChangePage} pageSize={10}/>
        </>}

      {isOpenedPopup &&
      <Popup
        onClose={closePopup}
        title="Подтверждение удаления"
        text={`Вы действительно хотите удалить данные о студенте: <strong>"${selectedItem.firstName} ${selectedItem.lastName}"</strong>? Эту операцию невозможно будет отменить!`}
        confirmFunc={() => handleClickDelete(selectedItem.id)}
      />}
    </>
  );
}

TeachersList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool
}

export default TeachersList;