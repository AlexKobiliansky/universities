import React, {useEffect, useState} from 'react';
import {mainRoute, teachersRoute} from "../config/breadcrumbs";
import {useDispatch, useSelector} from "react-redux";
import {fetchTeachers} from "../redux/actions/teacher";
import Breadcrumb from "../components/UI/Breadcrumb";
import {Link} from "react-router-dom";
import TeachersList from "../components/Teachers/TeachersList";
import {wrapToMark} from "../utils";
import {searchQueryTeacher, setSearchDataTeacher} from "../redux/reducers/teacherReducer";
import SearchLabel from "../components/SearchLabel/SearchLabel";

const breadcrumbs = [mainRoute(), teachersRoute()];

function Teachers() {
  const dispatch = useDispatch();
  const teachers = useSelector(({teacher}) => teacher.teachers);
  const {currentUser} = useSelector(({user}) => user);
  const loading = useSelector(({teacher}) => teacher.isLoading);
  const search = useSelector(({teacher}) => teacher.search);
  const searchData = useSelector(({teacher}) => teacher.searchData);
  const [breadcrumbRoutes] = useState(breadcrumbs);

  useEffect(() => {
    dispatch(fetchTeachers()); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e) => {
    let str = e.target.value.toLowerCase();
    dispatch(searchQueryTeacher(str));

    const newArr = teachers.filter(item =>
      item.firstName.toLowerCase().includes(str) ||
      item.lastName.toLowerCase().includes(str) ||
      item.department.title.toLowerCase().includes(str)
    )
      .map(item => {
        return {
          ...item,
          firstName: wrapToMark(item.firstName, str),
          lastName: wrapToMark(item.lastName, str),
          department: {
            ...item.department,
            title: wrapToMark(item.department.title, str)
          }
        }
      });

    dispatch(setSearchDataTeacher(newArr));
  }

  return (
    <>
      <Breadcrumb routes = {breadcrumbRoutes} />
      <h1>Список студентов</h1>

      <SearchLabel
        placeholder="Поиск среди преподавателей"
        onInput={handleSearch}
        currValue={search}
      />

      <TeachersList
        items={search.length > 0 ? searchData : teachers}
        loading={loading}/>

      {currentUser?.priority < 2 && !loading &&
      <div className="add-line">
        <Link to="/add/teacher" className="btn btn-primary">Добавить нового преподавателя</Link>
      </div>}
    </>
  );
}

export default Teachers;