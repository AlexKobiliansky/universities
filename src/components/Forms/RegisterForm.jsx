import React from 'react';
import './forms.sass';

import {Formik} from 'formik';
import * as yup from 'yup';
import classnames from "classnames";
import { useHistory } from "react-router-dom";
import {useDispatch} from 'react-redux';
import {login, register} from "../../redux/actions/user";

function RegisterForm() {
  let history = useHistory();
  const dispatch = useDispatch();

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
      .required('Это поле не должно быть пустым'),
      // .min(8, 'Длина пароля должна быть не менее 8-и символов'),
      // .matches(
      //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      //   "Пароль должен содержать по крайней мере один заглавный символ, обычный символ, цифру и спец-символ"
      // ),
    confirmPassword: yup.string()
      .trim('Не должно быть пробелов в начале и конце строки')
      .strict()
      .typeError('Должно быть строкой')
      .required('Это поле не должно быть пустым')
      .oneOf([yup.ref('password')], 'Несовпадение паролей'),
  });

  let submitForm = async (values) => {
    const registerSuccess = await register(values.login, values.password);

    if(registerSuccess) {
      const user = await dispatch(login(values.login, values.password));
      user && history.push('/');
    }

  }

  return (
    <> <Formik
      initialValues={{
        login: '',
        password: '',
        confirmPassword: ''
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
        <h3>Форма регистрации</h3>
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

          <label>
            <span>Повторение пароля</span>
            <input
              name="confirmPassword"
              type="password"
              className={classnames(
                'form-control',
                {'is-valid': touched.confirmPassword && !errors.confirmPassword},
                {'is-invalid': touched.confirmPassword && errors.confirmPassword},
              )}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
            />
            {touched.confirmPassword && errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
          </label>
        </div>

        <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Зарегистрироваться</button>
      </form>
      )}
    </Formik>
    </>

  );
}

export default RegisterForm;