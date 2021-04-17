import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {fetchSingleUniversity, updateSingleUniversity} from "../redux/actions/university";
import {fetchDepartments} from "../redux/actions/department";
import {fetchSingleStudent, updateStudent} from "../redux/actions/student";
import {
  mainRoute,
  singleStudentRoute,
  singleUniversityRoute,
  studentsRoute,
  universitiesRoute
} from "../config/breadcrumbs";
import Spinner from "../components/UI/Spinner";
import Breadcrumb from "../components/UI/Breadcrumb";
import ImgLabel from "../components/ImgLabel/ImgLabel";
import InfoLabel from "../components/InfoLabel/InfoLabel";

function Student(props) {
  const dispatch = useDispatch();
  const student = useSelector(({student}) => student.currentStudent);
  const loading = useSelector(({student}) => student.isLoading);
  const [breadcrumbRoutes, setBreadcrumbRoutes] = useState([]);
  const studentId = useParams().id;

  useEffect(() => {
    dispatch(fetchSingleStudent(studentId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentId]);

  console.log('student', student)

  useEffect(() => {
    setBreadcrumbRoutes([
      mainRoute(),
      studentsRoute(),
      singleStudentRoute(student?.id, `${student?.firstName} ${student?.lastName}`)]);
  }, [student]);

  const onEditInput = (inputEntity, value) => {
    if(!value) {
      return alert('Значение не может быть пустым!')
    }

    dispatch(updateStudent(studentId, {[inputEntity]: value}));
  }

  const onEditImg = (url) => {
    dispatch(updateStudent(studentId, {avatarUrl: url}));
  }

  const onDeleteImg = () => {
    dispatch(updateStudent(studentId, {avatarUrl: ''}));
  }

  return (
    <>
      {loading
        ? <Spinner />
        : <div>

          <Breadcrumb routes={breadcrumbRoutes} />
          <h1>{student.firstName} {student.lastName}</h1>

          <div className="row mb">
            <div className="col-md-4 col-lg-3">
              <ImgLabel
                img={student.avatarUrl}
                onEdit={onEditImg}
                onDelete={onDeleteImg}
              />
            </div>

            <div className="col-md-8 col-lg-9">
              <div className="info-labels-wrap">
                <InfoLabel title="Имя" value={student.firstName} entity="firstName" onEdit={onEditInput} />
                <InfoLabel title="Фамилия" value={student.lastName} entity="lastName" onEdit={onEditInput} />
                <InfoLabel title="Email" value={student.email} entity="email" onEdit={onEditInput}/>
                <InfoLabel title="Телефон" value={student.phone} entity="phone" onEdit={onEditInput}/>
              </div>
            </div>
          </div>
        </div>}
    </>
  );
}

export default Student;