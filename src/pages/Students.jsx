import React, {useEffect, useState} from 'react';
import {mainRoute, studentsRoute} from "../config/breadcrumbs";
import {useDispatch, useSelector} from "react-redux";
import {fetchStudents} from "../redux/actions/student";
import Breadcrumb from "../components/UI/Breadcrumb";
import {Link} from "react-router-dom";
import StudentsList from "../components/Students/StudentsList";

const breadcrumbs = [mainRoute(), studentsRoute()];

function Students() {
  const dispatch = useDispatch();
  const students = useSelector(({student}) => student.students);
  const {currentUser} = useSelector(({user}) => user);
  const loading = useSelector(({student}) => student.isLoading);
  const [breadcrumbRoutes] = useState(breadcrumbs);

  useEffect(() => {
    dispatch(fetchStudents()); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Breadcrumb routes = {breadcrumbRoutes} />
      <h1>Список студентов</h1>

      <StudentsList items={students} loading={loading}/>

      {currentUser?.priority < 2 && !loading &&
      <div className="add-line">
        <Link to="/add/student" className="btn btn-primary">Добавить нового студента</Link>
      </div>}
    </>
  );
}

export default Students;