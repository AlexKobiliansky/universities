import {SET_DEPARTMENTS, DELETE_DEPARTMENT, SET_LOADING} from "../types";

const defaultState = {
  departments: [],
  isLoading: false,
  currentDepartment: {}
}

export default function departmentReducer (state=defaultState, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
      case SET_DEPARTMENTS:
      return {
        ...state,
        departments: action.payload,
        isLoading: false
      }
    case DELETE_DEPARTMENT:
      return {
        ...state,
        departments: state.departments.filter(item => item.id !== action.payload),
      }
    default:
      return state
  }
}

export const setDepartments = departments => ({type: SET_DEPARTMENTS, payload: departments});
export const deleteDepartmentAC = id => ({type: DELETE_DEPARTMENT, payload: id});
export const setLoading = loading => ({type: SET_LOADING, payload: loading});