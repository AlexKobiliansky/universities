import React, {useState} from 'react';
import PropTypes from "prop-types";
import UniversitiesList from "./UniversitiesList";
import DeleteButton from "./UI/DeleteButton";
import {useSelector} from "react-redux";
import Pagination from "./UI/Pagination";

function DepartmentsList({items, univer}) {
  const {currentUser} = useSelector(({user}) => user);
  const [pageOfItems, setPageOfItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  let onChangePage = (pageOfItems, pageNumber) => {
    setPageOfItems(pageOfItems);
    setCurrentPage(pageNumber);
  }

  let handleClickDelete = (id) => {
    console.log('delete department: ', id);
  }

  return ( <>

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
            <td>{item.title}</td>
            <td>{univer ? univer : item.university?.alias}</td>
            <td>
              {currentUser && currentUser.priority < 2 &&
              <DeleteButton onClick={() => handleClickDelete(item.id)}/>
              }
            </td>
          </tr>
        ))
        }
        </tbody>
      </table>

    <Pagination items={items} onChangePage={onChangePage} pageSize={pageSize}/>




  </>);
}

UniversitiesList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  univer: PropTypes.string
}

export default DepartmentsList;