import {SET_USER, LOGOUT} from "../types";

const defaultState = {
  currentUser: null,
  isAuth: false
}

export default function userReducer (state=defaultState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuth: true
      }
    case LOGOUT:
      localStorage.removeItem('userData')
      return {
        ...state,
        currentUser: null,
        isAuth: false
      }
    default:
      return state
  }
}


// action creators
export const setUser = user => ({type: SET_USER, payload: user});
export const logout = () => ({type: LOGOUT});