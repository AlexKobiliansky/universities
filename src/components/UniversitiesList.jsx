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
import classnames from "classnames";

const TITLE = 'title';
const CITY = 'city';

function UniversitiesList({items, loading}) {
  const dispatch = useDispatch();
  const {currentUser} = useSelector(({user}) => user);

  const [universities, setUniversities] = useState(items);
  const [isOpenedPopup, setIsOpenedPopup] = useState(false);
  const [selectedItem, setSelecetedItem] = useState(null);
  const [pageOfItems, setPageOfItems] = useState([]);

  const [sortBy, setSortBy] = useState(null);
  const [sortOrderASC, setSortOrderASC] = useState(true);

  const createMarkup = html => {
    return {__html: html}
  }

  useEffect(() => {
    setUniversities(items);
  }, [items]);

  useEffect(() => {
    switch (sortBy) {
      case TITLE:
        sortOrderASC
          ? universities.sort((a, b) => b.title < a.title ? 1 : -1)
          : universities.sort((a, b) => b.title > a.title ? 1 : -1);
        break;
      case CITY:
        sortOrderASC
          ? universities.sort((a, b) => b.city < a.city ? 1 : -1)
          : universities.sort((a, b) => b.city > a.city ? 1 : -1);
        break;
      default:
        return
    }

    setUniversities([...universities]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, sortOrderASC])

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

  const handleSort = (sortEntity) => {
    sortEntity !== sortBy ? setSortOrderASC(true) : setSortOrderASC(!sortOrderASC);
    setSortBy(sortEntity);
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
              <th scope="col"
                  onClick={() => handleSort(TITLE)}
                  className={classnames('sorting-head', {'sorting': sortBy === TITLE}, {'desc': !sortOrderASC})}
              > Название</th>
              <th scope="col"
                  onClick={() => handleSort(CITY)}
                  className={classnames('sorting-head', {'sorting': sortBy === CITY}, {'desc': !sortOrderASC})}>Город</th>
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
                  <Link to={`/university/${item.id}`} dangerouslySetInnerHTML={createMarkup(item.title)} />
                </td>

                <td className="align-middle" ><span dangerouslySetInnerHTML={createMarkup(item.city)} /></td>

                <td className="align-middle">
                  <a href={item.site} target="_blank" rel="noreferrer">{item.site}</a>
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

          <Pagination items={universities} onChangePage={onChangePage} pageSize={10}/>
        </>
      }

      {isOpenedPopup &&
      <Popup
        onClose={closePopup}
        title="Подтверждение удаления?"
        text={`Вы действительно хотите удалить университет <strong>"${selectedItem.title}"</strong> со всеми факультетами? Эту операцию невозможно будет отменить!`}
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