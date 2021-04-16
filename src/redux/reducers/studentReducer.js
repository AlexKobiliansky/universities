import {
  DELETE_STUDENT,
  SET_LOADING_STUDENT,
  SET_SINGLE_STUDENT,
  SET_STUDENTS,
  UPDATE_STUDENT
} from "../types";

const defaultState = {
  students: [],
  isLoading: false,
  currentStudent: {}
}

export default function studentReducer (state=defaultState, action) {
  switch (action.type) {
    case SET_LOADING_STUDENT:
      return {
        ...state,
        isLoading: action.payload
      }
    case SET_STUDENTS:
      return {
        ...state,
        students: action.payload,
        isLoading: false
      }
    case SET_SINGLE_STUDENT:
      return {
        ...state,
        currentStudent: action.payload,
        isLoading: false
      }
    case UPDATE_STUDENT:
      return {
        ...state,
        currentStudent: {
          ...state.currentStudent,
          [Object.keys(action.payload)[0]]: Object.values(action.payload)[0]
        },
      }
    case DELETE_STUDENT:
      return {
        ...state,
        students: state.students.filter(item => item.id !== action.payload),
      }
    default:
      return state
  }
}

//action creators
export const setLoadingStudent = loading => ({type: SET_LOADING_STUDENT, payload: loading});
export const setStudents = students => ({type: SET_STUDENTS, payload: students});
export const setSingleStudentAC = student => ({type: SET_SINGLE_STUDENT, payload: student});
export const updateStudentAC = obj => ({type: UPDATE_STUDENT, payload: obj});
export const deleteStudentAC = id => ({type: DELETE_STUDENT, payload: id});

