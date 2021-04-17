import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {fetchSingleUniversity, fetchUniversities} from "../redux/actions/university";
import {fetchSingleTeacher, updateTeacher} from "../redux/actions/teacher";
import isEmpty from "lodash/isEmpty";
import {mainRoute, singleTeacherRoute, teachersRoute} from "../config/breadcrumbs";
import Spinner from "../components/UI/Spinner";
import Breadcrumb from "../components/UI/Breadcrumb";
import ImgLabel from "../components/ImgLabel/ImgLabel";
import InfoLabel from "../components/InfoLabel/InfoLabel";
import SelectLabel from "../components/SelectLabel/SelectLabel";

function Teacher() {
  const dispatch = useDispatch();
  const teacher = useSelector(({teacher}) => teacher.currentTeacher);
  const loading = useSelector(({teacher}) => teacher.isLoading);
  const [breadcrumbRoutes, setBreadcrumbRoutes] = useState([]);
  const teacherId = useParams().id;

  const universities = useSelector(({university}) => university.universities);
  const [selectUniversitiesValues, setSelectUniversitiesValues] = useState([]);
  const [selectUniversitiesNames, setSelectUniversitiesNames] = useState([]);

  const university = useSelector(({university}) => university.currentUniversity);
  const [selectDepartmentsValues, setSelectDepartmentsValues] = useState([]);
  const [selectDepartmentsNames, setSelectDepartmentsNames] = useState([]);
  const [changeUniver, setChangeUniver] = useState(false);

  useLayoutEffect(() => {
    dispatch(fetchSingleTeacher(teacherId));
    dispatch(fetchUniversities());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teacherId]);

  useEffect(() => {
    if (!isEmpty(university)) {
      setSelectDepartmentsValues(university?.departments.map(item => item.id));
      setSelectDepartmentsNames(university?.departments.map(item => item.title));
    }

    if (changeUniver) {
      setChangeUniver(false);
      dispatch(updateTeacher(teacherId, {"departmentId": parseInt(university.departments[0]?.id)}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [university]);

  useEffect(() => {
    setSelectUniversitiesValues(universities?.map(item => item.id));
    setSelectUniversitiesNames(universities?.map(item => item.title));

    if (!isEmpty(teacher)) {
      dispatch(fetchSingleUniversity(teacher?.department?.universityId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [universities]);

  const onChangeDepartmentsSelect = (selectEntity, value) => {
    dispatch(updateTeacher(teacherId, {[selectEntity]: parseInt(value)}));
  }

  const onChangeUniversitiesSelect = (univerId, id) => {
    dispatch(fetchSingleUniversity(id));
    setChangeUniver(true);
  }

  useEffect(() => {
    setBreadcrumbRoutes([
      mainRoute(),
      teachersRoute(),
      singleTeacherRoute(teacher?.id, `${teacher?.firstName} ${teacher?.lastName}`)]);
  }, [teacher]);

  const onEditInput = (inputEntity, value) => {
    if(!value) {
      return alert('Значение не может быть пустым!')
    }

    dispatch(updateTeacher(teacherId, {[inputEntity]: value}));
  }

  const onEditImg = url => dispatch(updateTeacher(teacherId, {avatarUrl: url}));

  const onDeleteImg = () => dispatch(updateTeacher(teacherId, {avatarUrl: ''}));

  return (
    <>
      {loading
        ? <Spinner />
        : <>
          <Breadcrumb routes={breadcrumbRoutes} />
          <h1>{teacher.firstName} {teacher.lastName}</h1>

          <div className="row mb">
            <div className="col-md-4 col-lg-3">
              <ImgLabel
                img={teacher.avatarUrl}
                onEdit={onEditImg}
                onDelete={onDeleteImg}
              />
            </div>

            <div className="col-md-8 col-lg-9">
              <div className="info-labels-wrap">
                <InfoLabel title="Имя" value={teacher.firstName} entity="firstName" onEdit={onEditInput} />
                <InfoLabel title="Фамилия" value={teacher.lastName} entity="lastName" onEdit={onEditInput} />
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
            currentValue={teacher.departmentId}
            values={selectDepartmentsValues}
            names={selectDepartmentsNames}
            entity="departmentId"
            onChange={onChangeDepartmentsSelect}
          />
          </>}
    </>
  );
}

export default Teacher;