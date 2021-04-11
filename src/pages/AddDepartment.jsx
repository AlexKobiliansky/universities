import React, {useEffect, useLayoutEffect, useState} from 'react';
import AddInfoLabel from "../components/InfoLabel/AddInfoLabel";
import {Formik} from 'formik';
import * as yup from 'yup';
import SelectLabel from "../components/SelectLabel/SelectLabel";
import {useDispatch, useSelector} from "react-redux";
import {fetchUniversities} from "../redux/actions/university";
import {departmentsAPI} from "../api/departmentsAPI";

function AddDepartment() {
  const dispatch = useDispatch();
  const universities = useSelector(({university}) => university.universities);

  const [selectValues, setSelectValues] = useState([]);
  const [selectNames, setSelectNames] = useState([]);

  useLayoutEffect(() => {
    dispatch(fetchUniversities());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSelectValues(universities?.map(item => item.id));
    setSelectNames(universities?.map(item => item.title));
  }, [universities])

  const validationSchema = yup.object().shape({
    title: yup.string()
      .typeError('Название должно быть строкой')
      .required('Введите название факультета'),
    universityId: yup.string()
      .typeError('Название должно быть строкой')
      .required('Выберите университет'),
  });

  const submitForm = (values, resetForm) => {

    const addingDepartment = {
      title: values.title,
      universityId: values.universityId,
    }
    
    departmentsAPI.addDepartment(addingDepartment)
      .then(() => {
        alert('Факультет успешно добавлен!');
        resetForm();
      })
      .catch(() => {
        alert('Не удалось добавить факультет');
      })
  }

  return (
    <div>
      <h1>Добавление факультета</h1>

      <Formik
        initialValues={{
          title: '',
          universityId: '',
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
              title="Университет"
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              values={selectValues}
              names={selectNames}
              entity="universityId"
              error={touched.universityId && errors.universityId ? errors.universityId : ''}
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

export default AddDepartment;