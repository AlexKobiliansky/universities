import {setUser} from '../reducers/user';
import {userAPI} from "../../api/user";

export const login = (login, password) => {
  return async dispatch => {
    try {
      const user = await userAPI.getUser(login, password)
        .then(({data}) => data[0])
        .catch(() => {
          alert('Проблемы при авторизации');
        });

      if (!user) {
        alert(`Не совпадает пара логин-пароль. Проверьте вводимые данные и попробуйте снова`);
      } else {
        dispatch(setUser(user));
        return user;
      }
    } catch (e) {
      console.log(e.response);
    }
  }
}