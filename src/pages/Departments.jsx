import React, {useEffect, useState} from 'react';
import DepartmentsList from "../components/Departments/DepartmentsList";
import {useDispatch, useSelector} from "react-redux";
import {fetchDepartments} from "../redux/actions/department";
import {Link} from "react-router-dom";
import Breadcrumb from "../components/UI/Breadcrumb";
import {departmentsRoute, mainRoute} from "../config/breadcrumbs";

const breadcrumbs = [mainRoute(), departmentsRoute()];

function Departments() {
  const dispatch = useDispatch();
  const departments = useSelector(({department}) => department.departments);
  const {currentUser} = useSelector(({user}) => user);
  const loading = useSelector(({department}) => department.isLoading);
  const [breadcrumbRoutes] = useState(breadcrumbs);

  useEffect(() => {
    dispatch(fetchDepartments()); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Breadcrumb routes = {breadcrumbRoutes} />
      <h1>Факультеты</h1>

      <DepartmentsList items={departments} loading={loading} />

      {currentUser && currentUser.priority < 2 && !loading &&
      <div className="add-line">
        <Link to="/add/department" className="btn btn-primary">Добавить факультет</Link>
      </div>
      }
    </>
  );
}

export default Departments;