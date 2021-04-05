import React from 'react';
import {useHistory} from "react-router-dom";
import * as yup from "yup";
import {Formik} from "formik";
import classnames from "classnames";
import {login} from "../../redux/actions/user";
import {useDispatch} from 'react-redux';

function LoginForm() {
  const dispatch = useDispatch()
  const history = useHistory();

  const validationSchema = yup.object().shape({
    login: yup.string()
      .trim('Не должно быть пробелов в начале и конце строки')
      .strict()
      .typeError('Должно быть строкой')
      .required('Это поле не должно быть пустым')
      .min(4, 'Длина логина должна быть не менее 4-х символов')
      .max(30, 'Длина логина должна быть не более 30-и символов'),
    password: yup.string()
      .trim('Не должно быть пробелов в начале и конце строки')
      .strict()
      .typeError('Должно быть строкой')
      .required('Это поле не должно быть пустым')
      // .min(8, 'Длина пароля должна быть не менее 8-и символов')
      // .matches(
      //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      //   "Пароль должен содержать по крайней мере один заглавный символ, обычный символ, цифру и спец-символ"
      // ),
  });

  let submitForm = async (values) => {
    const user = await dispatch(login(values.login, values.password));
    user && history.push('/');
  }


  return (
    <>
      <Formik
      initialValues={{
        login: '',
        password: '',
      }}
      validateOnBlur
      onSubmit={(values) => {
        submitForm(values)
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
        <form className="enter-form">
          <h3>Форма входа</h3>
          <div className="form-content">
            <label>
              <span>Логин</span>
              <input
                name="login"
                type="text"
                className={classnames(
                  'form-control',
                  {'is-valid': touched.login && !errors.login},
                  {'is-invalid': touched.login && errors.login},
                )}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.login}
              />
              {touched.login && errors.login && <div className="invalid-feedback">{errors.login}</div>}
            </label>

            <label>
              <span>Пароль</span>
              <input
                name="password"
                type="password"
                className={classnames(
                  'form-control',
                  {'is-valid': touched.password && !errors.password},
                  {'is-invalid': touched.password && errors.password},
                )}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {touched.password && errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </label>
          </div>

          <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Войти</button>
        </form>
      )}
    </Formik>
    </>
  )}

export default LoginForm;