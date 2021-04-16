import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {fetchSingleDiscipline, updateDiscipline} from "../redux/actions/discipline";
import {
  disciplinesRoute,
  mainRoute,
  singleDisciplineRoute
} from "../config/breadcrumbs";
import Spinner from "../components/UI/Spinner";
import Breadcrumb from "../components/UI/Breadcrumb";
import InfoLabel from "../components/InfoLabel/InfoLabel";
import SelectLabel from "../components/SelectLabel/SelectLabel";
import {fetchSingleUniversity, fetchUniversities} from "../redux/actions/university";
import isEmpty from 'lodash/isEmpty';

function Discipline() {
  const dispatch = useDispatch();

  const loadingDiscipline = useSelector(({discipline}) => discipline.isLoading);
  const disciplineId = useParams().id;
  const discipline = useSelector(({discipline}) => discipline.currentDiscipline);

  const universities = useSelector(({university}) => university.universities);
  const [selectUniversitiesValues, setSelectUniversitiesValues] = useState([]);
  const [selectUniversitiesNames, setSelectUniversitiesNames] = useState([]);

  const university = useSelector(({university}) => university.currentUniversity);
  const [selectDepartmentsValues, setSelectDepartmentsValues] = useState([]);
  const [selectDepartmentsNames, setSelectDepartmentsNames] = useState([]);
  const [changeUniver, setChangeUniver] = useState(false);

  const [breadcrumbRoutes, setBreadcrumbRoutes] = useState([]);
  
  useLayoutEffect(() => {
    dispatch(fetchSingleDiscipline(disciplineId));
    dispatch(fetchUniversities());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isEmpty(university)) {
      setSelectDepartmentsValues(university?.departments.map(item => item.id));
      setSelectDepartmentsNames(university?.departments.map(item => item.title));
    }

    if (changeUniver) {
      setChangeUniver(false);
      dispatch(updateDiscipline(disciplineId, {"departmentId": parseInt(university.departments[0]?.id)}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [university]);

  useEffect(() => {
    setSelectUniversitiesValues(universities?.map(item => item.id));
    setSelectUniversitiesNames(universities?.map(item => item.title));

    if (!isEmpty(discipline)) {
      dispatch(fetchSingleUniversity(discipline?.department?.universityId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [universities]);

  useEffect(() => {
    setBreadcrumbRoutes([
      mainRoute(),
      disciplinesRoute(),
      singleDisciplineRoute(discipline?.id, discipline?.title)
    ]);
  }, [discipline]);

  const onEditInput = (inputEntity, value) => {
    if (!value) {
      return alert('Значение не может быть пустым!')
    }

    dispatch(updateDiscipline(disciplineId, {[inputEntity]: value}));
  }

  const onChangeDepartmentsSelect = (selectEntity, value) => {
    dispatch(updateDiscipline(disciplineId, {[selectEntity]: parseInt(value)}));
  }

  const onChangeUniversitiesSelect = (univerId, id) => {
    dispatch(fetchSingleUniversity(id));
    setChangeUniver(true);
  }

  return (
    <>
      {loadingDiscipline
        ? <Spinner/>
        : <div>
          <Breadcrumb routes={breadcrumbRoutes} />
          <h1>{discipline.title}</h1>
          <InfoLabel title="Название" value={discipline.title} entity="title" onEdit={onEditInput}/>

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
            currentValue={discipline.departmentId}
            values={selectDepartmentsValues}
            names={selectDepartmentsNames}
            entity="departmentId"
            onChange={onChangeDepartmentsSelect}
          />
        </div>
      }
    </>
  );
}

export default Discipline;