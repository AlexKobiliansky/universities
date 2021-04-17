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

function TeachersList({items, loading}) {
  const dispatch = useDispatch();
  const {currentUser} = useSelector(({user}) => user);

  const [teachers, setSTeachers] = useState(items);
  const [isOpenedPopup, setIsOpenedPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [pageOfItems, setPageOfItems] = useState([]);

  useEffect(() => {
    setSTeachers(items);
  }, [items]);

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

  return (
    <>
      {loading
        ? <Spinner/>
        : <>
          <table className="table table-hover table-striped">
            <thead>
            <tr>
              <th scope="col">Фото</th>
              <th scope="col">Имя</th>
              <th scope="col">Факультет</th>
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
                <td className="align-middle"><Link to={`/teacher/${item.id}`}>{item.firstName} {item.lastName}</Link></td>
                <td className="align-middle" style={{'maxWidth': 250}}>{item.department && <Link to={`/department/${item.department?.id}`}>{item.department?.title}</Link>}</td>
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
        text={`Вы действительно хотите удалить данные о студенте: "${selectedItem.firstName} ${selectedItem.lastName}"? Эту операцию невозможно будет отменить!`}
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