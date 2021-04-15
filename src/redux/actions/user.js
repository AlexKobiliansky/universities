import {setUser} from '../reducers/userReducer';
import {userAPI} from "../../api/userAPI";

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
        localStorage.setItem("userData", JSON.stringify(user));
        dispatch(setUser(user));
        return user;
      }
    } catch (e) {
      console.log(e.response);
    }
  }
}


export const register = async (login, password) => {
  const candidate = await userAPI.getUser(login)
    .then(({data}) => data[0])
    .catch(() => {
      alert('Проблемы при регистрации');
      return false;
    });

  if (candidate && candidate.login === login) {
    alert(`Пользователь с логином ${login} уже существует!`);
    return false;
  } else {
    const newUser = {
      login: login,
      password: password,
      priority: 2
    }
    await userAPI.addUser(newUser).catch(() => {
      alert('Проблемы при регистрации');
      return false;
    });

    alert('Регистрация успешна!')
    return true;
  }
}