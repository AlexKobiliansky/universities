import {
  DELETE_TEACHER, SEARCH_DATA_TEACHER, SEARCH_QUERY_TEACHER,
  SET_LOADING_TEACHER,
  SET_SINGLE_TEACHER,
  SET_TEACHERS,
  UPDATE_TEACHER
} from "../types";

const defaultState = {
  teachers: [],
  isLoading: false,
  currentTeacher: {},
  search: '',
  searchData: [],
}

export default function teacherReducer (state=defaultState, action) {
  switch (action.type) {
    case SET_LOADING_TEACHER:
      return {
        ...state,
        isLoading: action.payload
      }
    case SET_TEACHERS:
      return {
        ...state,
        teachers: action.payload,
        isLoading: false
      }
    case SET_SINGLE_TEACHER:
      return {
        ...state,
        currentTeacher: action.payload,
        isLoading: false
      }
    case UPDATE_TEACHER:
      return {
        ...state,
        currentTeacher: {
          ...state.currentTeacher,
          [Object.keys(action.payload)[0]]: Object.values(action.payload)[0]
        },
      }
    case DELETE_TEACHER:
      return {
        ...state,
        teachers: state.teachers.filter(item => item.id !== action.payload),
      }
    case SEARCH_QUERY_TEACHER:
      return {
        ...state,
        search: action.payload
      }
    case SEARCH_DATA_TEACHER:
      return {
        ...state,
        searchData: action.payload
      }
    default:
      return state
  }
}

//action creators
export const setLoadingTeacher = loading => ({type: SET_LOADING_TEACHER, payload: loading});
export const setTeachers = students => ({type: SET_TEACHERS, payload: students});
export const setSingleTeacherAC = student => ({type: SET_SINGLE_TEACHER, payload: student});
export const updateTeacherAC = obj => ({type: UPDATE_TEACHER, payload: obj});
export const deleteTeacherAC = id => ({type: DELETE_TEACHER, payload: id});
export const searchQueryTeacher = searchQuery => ({type: SEARCH_QUERY_TEACHER, payload: searchQuery});
export const setSearchDataTeacher = searchData => ({type: SEARCH_DATA_TEACHER, payload: searchData});