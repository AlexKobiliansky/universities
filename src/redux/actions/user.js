import axios from 'axios';
import {setUser} from '../reducers/user';




export const login = (login, password) => {
  return async dispatch => {
    try {
      const user = await axios.get(`http://localhost:3001/users?login=${login}&password=${password}`)
        .then(({data}) => data[0])
        .catch(() => {
          alert('Проблемы при авторизации');
        });

      if (!user) {
        alert(`Не совпадает пара логин-пароль. Проверьте вводимые данные и попробуйте снова`);
        // return false;
      } else {
        dispatch(setUser(user));
        return user;
      }
    } catch (e) {
      console.log(e.response);
    }
  }
}