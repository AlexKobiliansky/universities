import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {fetchSingleUniversity, fetchUniversities} from "../redux/actions/university";
import {fetchSingleStudent, updateStudent} from "../redux/actions/student";
import {
  mainRoute,
  singleStudentRoute,
  studentsRoute
} from "../config/breadcrumbs";
import Spinner from "../components/UI/Spinner";
import Breadcrumb from "../components/UI/Breadcrumb";
import ImgLabel from "../components/ImgLabel/ImgLabel";
import InfoLabel from "../components/InfoLabel/InfoLabel";
import isEmpty from "lodash/isEmpty";
import SelectLabel from "../components/SelectLabel/SelectLabel";

function Student() {
  const dispatch = useDispatch();
  const student = useSelector(({student}) => student.currentStudent);
  const loading = useSelector(({student}) => student.isLoading);
  const [breadcrumbRoutes, setBreadcrumbRoutes] = useState([]);
  const studentId = useParams().id;

  const universities = useSelector(({university}) => university.universities);
  const [selectUniversitiesValues, setSelectUniversitiesValues] = useState([]);
  const [selectUniversitiesNames, setSelectUniversitiesNames] = useState([]);

  const university = useSelector(({university}) => university.currentUniversity);
  const [selectDepartmentsValues, setSelectDepartmentsValues] = useState([]);
  const [selectDepartmentsNames, setSelectDepartmentsNames] = useState([]);
  const [changeUniver, setChangeUniver] = useState(false);

  useLayoutEffect(() => {
    dispatch(fetchSingleStudent(studentId));
    dispatch(fetchUniversities());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentId]);

  useEffect(() => {
    if (!isEmpty(university)) {
      setSelectDepartmentsValues(university?.departments.map(item => item.id));
      setSelectDepartmentsNames(university?.departments.map(item => item.title));
    }

    if (changeUniver) {
      setChangeUniver(false);
      dispatch(updateStudent(studentId, {"departmentId": parseInt(university.departments[0]?.id)}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [university]);

  useEffect(() => {
    setSelectUniversitiesValues(universities?.map(item => item.id));
    setSelectUniversitiesNames(universities?.map(item => item.title));

    if (!isEmpty(student)) {
      dispatch(fetchSingleUniversity(student?.department?.universityId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [universities]);

  const onChangeDepartmentsSelect = (selectEntity, value) => {
    dispatch(updateStudent(studentId, {[selectEntity]: parseInt(value)}));
  }

  const onChangeUniversitiesSelect = (univerId, id) => {
    dispatch(fetchSingleUniversity(id));
    setChangeUniver(true);
  }

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

          <SelectLabel
            title="Институт"
            currentValue={university.id}
            values={selectUniversitiesValues}
            names={selectUniversitiesNames}
            entity="universityId"
            onChange={onChangeUniversitiesSelect}
          />

          <SelectLabel
            title="Факультет"
            currentValue={student.departmentId}
            values={selectDepartmentsValues}
            names={selectDepartmentsNames}
            entity="departmentId"
            onChange={onChangeDepartmentsSelect}
          />


        </div>}
    </>
  );
}

export default Student;