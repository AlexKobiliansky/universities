import React, {useEffect, useState} from 'react';
import {mainRoute, teachersRoute} from "../config/breadcrumbs";
import {useDispatch, useSelector} from "react-redux";
import {fetchTeachers} from "../redux/actions/teacher";
import Breadcrumb from "../components/UI/Breadcrumb";
import {Link} from "react-router-dom";
import TeachersList from "../components/Teachers/TeachersList";

const breadcrumbs = [mainRoute(), teachersRoute()];

function Teachers() {
  const dispatch = useDispatch();
  const teachers = useSelector(({teacher}) => teacher.teachers);
  const {currentUser} = useSelector(({user}) => user);
  const loading = useSelector(({teacher}) => teacher.isLoading);
  const [breadcrumbRoutes] = useState(breadcrumbs);

  useEffect(() => {
    dispatch(fetchTeachers()); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Breadcrumb routes = {breadcrumbRoutes} />
      <h1>Список студентов</h1>

      <TeachersList items={teachers} loading={loading}/>

      {currentUser?.priority < 2 && !loading &&
      <div className="add-line">
        <Link to="/add/teacher" className="btn btn-primary">Добавить нового преподавателя</Link>
      </div>}
    </>
  );
}

export default Teachers;