import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchSingleDepartment, updateDepartment} from "../redux/actions/department";
import Spinner from "../components/UI/Spinner";
import InfoLabel from "../components/InfoLabel/InfoLabel";
import SelectLabel from "../components/SelectLabel/SelectLabel";
import {fetchUniversities, updateSingleUniversity} from "../redux/actions/university";

function Department() {
  const loading = useSelector(({department}) => department.isLoading);
  const departmentId = useParams().id;
  const dispatch = useDispatch();
  const universities = useSelector(({university}) => university.universities);
  const department = useSelector(({department}) => department.currentDepartment);
  const [selectValues, setSelectValues] = useState([]);
  const [selectNames, setSelectNames] = useState([]);


  useLayoutEffect(() => {
    dispatch(fetchSingleDepartment(departmentId)); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(fetchUniversities()); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setSelectValues(universities?.map(item => item.id));
    setSelectNames(universities?.map(item => item.title));
  }, [universities])

  const onEditInput = (inputEntity, value) => {
    if (!value) {
      return alert('Значение не может быть пустым!')
    }

    dispatch(updateDepartment(departmentId, {[inputEntity]: value}));
  }

  const onChangeSelect = (selectEntity, value) => {
    dispatch(updateDepartment(departmentId, {[selectEntity]: value}));
  }

  return (
    <>
      {loading
        ? <Spinner/>
        : <div>
          <h1>{department.title}</h1>
          <InfoLabel title="Название" value={department.title} entity="title" onEdit={onEditInput}/>
          <SelectLabel
            title="Университет"
            currentValue={department.universityId}
            values={selectValues}
            names={selectNames}
            entity="universityId"
            onChange={onChangeSelect}
            items={universities}
          />
        </div>
      }
    </>
  );
}

export default Department;