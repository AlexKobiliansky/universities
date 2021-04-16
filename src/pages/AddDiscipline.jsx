import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  addDisciplineRoute,
  disciplinesRoute,
  mainRoute
} from "../config/breadcrumbs";
import {useDispatch, useSelector} from "react-redux";
import {fetchDisciplines} from "../redux/actions/discipline";
import {fetchDepartments} from "../redux/actions/department";
import * as yup from "yup";
import {departmentAPI} from "../api/departmentAPI";
import Breadcrumb from "../components/UI/Breadcrumb";
import AddInfoLabel from "../components/InfoLabel/AddInfoLabel";
import SelectLabel from "../components/SelectLabel/SelectLabel";
import {Formik} from "formik";
import {disciplineAPI} from "../api/disciplineAPI";


const breadcrumbs = [
  mainRoute(),
  disciplinesRoute(),
  addDisciplineRoute(),
];

function AddDiscipline() {
  const dispatch = useDispatch();
  const departments = useSelector(({department}) => department.departments);

  const [selectValues, setSelectValues] = useState([]);
  const [selectNames, setSelectNames] = useState([]);
  const [breadcrumbRoutes] = useState(breadcrumbs);

  useLayoutEffect(() => {
    dispatch(fetchDepartments());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSelectValues(departments?.map(item => item.id));
    setSelectNames(departments?.map(item => item.title));
  }, [departments]);

  const validationSchema = yup.object().shape({
    title: yup.string()
      .typeError('Название должно быть строкой')
      .required('Введите название дисциплины'),
    departmentId: yup.string()
      .typeError('Название должно быть строкой')
      .required('Выберите факультет'),
  });

  const submitForm = (values, resetForm) => {

    const addingDiscipline = {
      title: values.title,
      departmentId: parseInt(values.departmentId),
    }

    disciplineAPI.addDiscipline(addingDiscipline)
      .then(() => {
        alert('Дисциплина успешно добавлена!');
        resetForm();
      })
      .catch(() => {
        alert('Не удалось добавить дисциплину');
      })
  }

  return (
    <div>
      <Breadcrumb routes = {breadcrumbRoutes} />
      <h1>Добавить дисциплину</h1>

      <Formik
        initialValues={{
          title: '',
          departmentId: '',
        }}
        validateOnBlur
        onSubmit={(values, { resetForm }) => {
          submitForm(values, resetForm);
        }}
        validationSchema={validationSchema}
      >

        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isValid,
            handleSubmit,
            dirty,
            setFieldValue,
            setFieldTouched
          }) => (

          <form>
            <AddInfoLabel
              title="Название"
              inputName="title"
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.title}
              error={touched.title && errors.title ? errors.title : ''}
            />

            <SelectLabel
              title="Факультет"
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              values={selectValues}
              names={selectNames}
              entity="departmentId"
              error={touched.departmentId && errors.departmentId ? errors.departmentId : ''}
            />

            <div className="margin-top align-right">
              <button type="submit" disabled={(!isValid && dirty)} className="btn btn-primary" onClick={handleSubmit}>Сохранить</button>
            </div>
          </form>
        )}
      </Formik>


    </div>
  );
}

export default AddDiscipline;