import React, {useEffect, useState} from 'react';
import {mainRoute, studentsRoute} from "../config/breadcrumbs";
import {useDispatch, useSelector} from "react-redux";
import {fetchStudents} from "../redux/actions/student";
import Breadcrumb from "../components/UI/Breadcrumb";
import {Link} from "react-router-dom";
import StudentsList from "../components/Students/StudentsList";
import {searchQueryStudent, setSearchDataStudent} from "../redux/reducers/studentReducer";
import SearchLabel from "../components/SearchLabel/SearchLabel";
import {wrapToMark} from "../utils";

const breadcrumbs = [mainRoute(), studentsRoute()];

function Students() {
  const dispatch = useDispatch();
  const students = useSelector(({student}) => student.students);
  const {currentUser} = useSelector(({user}) => user);
  const loading = useSelector(({student}) => student.isLoading);
  const search = useSelector(({student}) => student.search);
  const searchData = useSelector(({student}) => student.searchData);
  const [breadcrumbRoutes] = useState(breadcrumbs);

  useEffect(() => {
    dispatch(fetchStudents()); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e) => {
    let str = e.target.value.toLowerCase();
    dispatch(searchQueryStudent(str));

    const newArr = students.filter(item =>
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

    dispatch(setSearchDataStudent(newArr));
  }

  return (
    <>
      <Breadcrumb routes = {breadcrumbRoutes} />
      <h1>Список студентов</h1>

      <SearchLabel
        placeholder="Поиск среди студентов"
        onInput={handleSearch}
        currValue={search}
      />

      <StudentsList
        items={search.length > 0 ? searchData : students}
        loading={loading}/>

      {currentUser?.priority < 2 && !loading &&
      <div className="add-line">
        <Link to="/add/student" className="btn btn-primary">Добавить нового студента</Link>
      </div>}
    </>
  );
}

export default Students;