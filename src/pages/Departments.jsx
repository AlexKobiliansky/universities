import React, {useEffect, useState} from 'react';
import DepartmentsList from "../components/Departments/DepartmentsList";
import {useDispatch, useSelector} from "react-redux";
import {fetchDepartments} from "../redux/actions/department";
import {Link} from "react-router-dom";
import Breadcrumb from "../components/UI/Breadcrumb";
import {departmentsRoute, mainRoute} from "../config/breadcrumbs";
import {searchQueryUniversity, setSearchDataUniversity} from "../redux/reducers/universityReducer";
import {searchQueryDepartment, setSearchDataDepartment} from "../redux/reducers/departmentReducer";
import SearchLabel from "../components/SearchLabel/SearchLabel";
import {wrapToMark} from "../utils";

const breadcrumbs = [mainRoute(), departmentsRoute()];

function Departments() {
  const dispatch = useDispatch();
  const departments = useSelector(({department}) => department.departments);
  const {currentUser} = useSelector(({user}) => user);
  const loading = useSelector(({department}) => department.isLoading);
  const search = useSelector(({department}) => department.search);
  const searchData = useSelector(({department}) => department.searchData);
  const [breadcrumbRoutes] = useState(breadcrumbs);

  useEffect(() => {
    dispatch(fetchDepartments()); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e) => {
    let str = e.target.value.toLowerCase();
    dispatch(searchQueryDepartment(str));

    const newArr = departments.filter(item =>
      item.title.toLowerCase().includes(str) ||
      item.university.alias.toLowerCase().includes(str)
    )
      .map(item => {
        return {
          ...item,
          title: wrapToMark(item.title, str),
          university: {
            ...item.university,
            alias: wrapToMark(item.university.alias, str)
          }
        }
      });

    dispatch(setSearchDataDepartment(newArr));
  }

  return (
    <>
      <Breadcrumb routes = {breadcrumbRoutes} />
      <h1>Факультеты</h1>

      <SearchLabel
        placeholder="Поиск по факультетам"
        onInput={handleSearch}
        currValue={search}
      />

      <DepartmentsList
        items={search.length > 0 ? searchData : departments}
        loading={loading} />

      {currentUser?.priority < 2 && !loading &&
      <div className="add-line">
        <Link to="/add/department" className="btn btn-primary">Добавить факультет</Link>
      </div>
      }
    </>
  );
}

export default Departments;