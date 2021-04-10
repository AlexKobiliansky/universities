import React, {useState} from 'react';
import AddInfoLabel from "../components/InfoLabel/AddInfoLabel";
import {Formik} from 'formik';
import * as yup from 'yup';
import {univerAPI} from "../api/univerAPI";
import ImgLabel from "../components/ImgLabel/ImgLabel";

function AddUniversity() {
  const [logoUrl, setLogoUrl] = useState('');


  const validationSchema = yup.object().shape({
    title: yup.string()
      .typeError('Название должно быть строкой')
      .required('Введите название университета'),
    city: yup.string()
      .typeError('Название города должно быть строкой')
      .required('Введите город'),
    site: yup.string()
      .typeError('Название города должно быть строкой')
      .matches(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/g,
        'Некорректный URL сайта'
      ),
    alias: yup.string()
      .typeError('Название должно быть строкой')
      .required('Введите краткое название университета'),
  });

  const submitForm = (values, resetForm) => {

    const addingUniver = {
      title: values.title,
      city: values.city,
      site: values.site,
      alias: values.alias,
      logoUrl: logoUrl
    }

    univerAPI.addUniver(addingUniver)
      .then(() => {
        //TODO: api for posterior adding departmens with added university
        // axios.get('http://localhost:3001/universities?end=1&sort=id&order=desc').then(({data}) => console.log(data[0]));
        alert('Университет успешно добавлен!');
        resetForm();
        setLogoUrl('');
      })
      .catch(() => {
      alert('Не удалось добавить университет');
    })
  }

  const onEditImg = (url) => {
    setLogoUrl(url);
  }

  const onDeleteImg = () => {
    setLogoUrl('');
  }

  return (
    <div>
      <h1>Добавление университета</h1>

      <Formik
        initialValues={{
          title: '',
          city: '',
          site: '',
          alias: ''
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
          }) => (


          <form>
            <div className="row mb">
              <div className="col-md-4 col-lg-3">
                <ImgLabel
                  img={logoUrl}
                  onEdit={onEditImg}
                  onDelete={onDeleteImg}
                />
              </div>

              <div className="col-md-8 col-lg-9">
                <div className="info-labels-wrap">
                  <AddInfoLabel
                    title="Название"
                    inputName="title"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.title}
                    error={touched.title && errors.title ? errors.title : ''}
                  />

                  <AddInfoLabel
                    title="Сайт"
                    inputName="site"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.site}
                    error={touched.site && errors.site ? errors.site : ''}
                  />
                  <AddInfoLabel
                    title="Город"
                    inputName="city"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.city}
                    error={touched.city && errors.city ? errors.city : ''}
                  />
                  <AddInfoLabel
                    title="Сокращенное название"
                    inputName="alias"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.alias}
                    error={touched.alias && errors.alias ? errors.alias : ''}
                  />
                  <div className="margin-top align-right">
                    <button type="submit" disabled={(!isValid && dirty)} className="btn btn-primary" onClick={handleSubmit}>Сохранить</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default AddUniversity;