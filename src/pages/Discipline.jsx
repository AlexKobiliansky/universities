import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {fetchSingleDiscipline, updateDiscipline} from "../redux/actions/discipline";
import {fetchDepartments, updateDepartment} from "../redux/actions/department";
import {
  departmentsRoute,
  disciplinesRoute,
  mainRoute,
  singleDepartmentRoute,
  singleDisciplineRoute
} from "../config/breadcrumbs";
import Spinner from "../components/UI/Spinner";
import Breadcrumb from "../components/UI/Breadcrumb";
import InfoLabel from "../components/InfoLabel/InfoLabel";
import SelectLabel from "../components/SelectLabel/SelectLabel";

function Discipline() {
  const loadingDiscipline = useSelector(({discipline}) => discipline.isLoading);
  const disciplineId = useParams().id;
  const dispatch = useDispatch();
  const departments = useSelector(({department}) => department.departments);
  const discipline = useSelector(({discipline}) => discipline.currentDiscipline);
  const [selectValues, setSelectValues] = useState([]);
  const [selectNames, setSelectNames] = useState([]);
  const [breadcrumbRoutes, setBreadcrumbRoutes] = useState([]);

  useLayoutEffect(() => {
    dispatch(fetchSingleDiscipline(disciplineId));
    dispatch(fetchDepartments());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSelectValues(departments?.map(item => item.id));
    setSelectNames(departments?.map(item => item.title));
  }, [departments]);

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

  const onChangeSelect = (selectEntity, value) => {
    dispatch(updateDiscipline(disciplineId, {[selectEntity]: value}));
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
            title="Факультет"
            currentValue={discipline.departmentId}
            values={selectValues}
            names={selectNames}
            entity="departmentId"
            onChange={onChangeSelect}
          />
        </div>
      }
    </>
  );
}

export default Discipline;