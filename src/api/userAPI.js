import { instance } from "./index";

export const userAPI = {
  getUser(login=null, password=null) {
    return instance.get(`/users?${
      login !== null ? `login=${login}` : ''}&${
      password !== null ? `password=${password}` : ''}`)
  },

  addUser(user) {
    return instance.post(`users`, user)
  }
}