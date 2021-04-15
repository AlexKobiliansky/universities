import {
  SET_DEPARTMENTS,
  DELETE_DEPARTMENT,
  SET_LOADING_DEPARTMENT,
  SET_SINGLE_DEPARTMENT,
  UPDATE_DEPARTMENT
} from "../types";

const defaultState = {
  departments: [],
  isLoading: false,
  currentDepartment: {}
}

export default function departmentReducer (state=defaultState, action) {
  switch (action.type) {
    case SET_LOADING_DEPARTMENT:
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
    case SET_SINGLE_DEPARTMENT:
      return {
        ...state,
        currentDepartment: action.payload,
        isLoading: false
      }
    case UPDATE_DEPARTMENT:
      return {
        ...state,
        currentDepartment: {
          ...state.currentDepartment,
          [Object.keys(action.payload)[0]]: Object.values(action.payload)[0]
        },
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

// action creators
export const setLoading = loading => ({type: SET_LOADING_DEPARTMENT, payload: loading});
export const setDepartments = departments => ({type: SET_DEPARTMENTS, payload: departments});
export const setSingleDepartmentAC = department => ({type: SET_SINGLE_DEPARTMENT, payload: department});
export const updateDepartmentAC = obj => ({type: UPDATE_DEPARTMENT, payload: obj});
export const deleteDepartmentAC = id => ({type: DELETE_DEPARTMENT, payload: id});

