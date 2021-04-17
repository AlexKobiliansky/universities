import React, {useEffect, useLayoutEffect, useState} from 'react';
import {addTeacherRoute, mainRoute, teachersRoute} from "../config/breadcrumbs";
import {useDispatch, useSelector} from "react-redux";
import {fetchDepartments} from "../redux/actions/department";
import * as yup from "yup";
import {teacherAPI} from "../api/teacherAPI";
import Breadcrumb from "../components/UI/Breadcrumb";
import {Formik} from "formik";
import ImgLabel from "../components/ImgLabel/ImgLabel";
import AddInfoLabel from "../components/InfoLabel/AddInfoLabel";
import SelectLabel from "../components/SelectLabel/SelectLabel";

const breadcrumbs = [
  mainRoute(),
  teachersRoute(),
  addTeacherRoute()
];

function AddTeacher() {
  const dispatch = useDispatch();
  const departments = useSelector(({department}) => department.departments);

  const [selectValues, setSelectValues] = useState([]);
  const [selectNames, setSelectNames] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState('');
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
    firstName: yup.string()
      .typeError('Имя должно быть строкой')
      .required('Введите Имя'),
    lastName: yup.string()
      .typeError('Фамилия должна быть строкой')
      .required('Введите Фамилию'),
    departmentId: yup.string()
      .typeError('Название должно быть строкой')
      .required('Выберите факультет'),
  });

  const submitForm = async (values, resetForm) => {

    const addingTeacher = {
      firstName: values.firstName,
      lastName: values.lastName,
      avatarUrl: avatarUrl,
      departmentId: parseInt(values.departmentId),
    }

    try {
      await teacherAPI.addTeacher(addingTeacher);
      alert('Преподаватель успешно добавлен!');

      resetForm();
      setAvatarUrl('');
    } catch (e) {
      alert('Не удалось добавить преподавателя');
    }
  }

  const onEditImg = (url) => {
    setAvatarUrl(url);
  }

  const onDeleteImg = () => {
    setAvatarUrl('');
  }


  return (
    <>
      <Breadcrumb routes = {breadcrumbRoutes} />
      <h1>Добавить преподавателя</h1>

      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          avatarUrl: '',
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
            <div className="row mb">
              <div className="col-md-4 col-lg-3">
                <ImgLabel
                  img={avatarUrl}
                  onEdit={onEditImg}
                  onDelete={onDeleteImg}
                />
              </div>

              <div className="col-md-8 col-lg-9">
                <div className="info-labels-wrap">
                  <AddInfoLabel
                    title="Имя"
                    inputName="firstName"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.firstName}
                    error={touched.firstName && errors.firstName ? errors.firstName : ''}
                  />

                  <AddInfoLabel
                    title="Фамилия"
                    inputName="lastName"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.lastName}
                    error={touched.lastName && errors.lastName ? errors.lastName : ''}
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
                    <button type="submit" disabled={(!isValid && dirty)} className="btn btn-primary"
                            onClick={handleSubmit}>Сохранить
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}

export default AddTeacher;