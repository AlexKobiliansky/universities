import {SET_DISCIPLINES, SET_LOADING_DISCIPLINE} from "../types";

const defaultState = {
  departments: [],
  isLoading: false,
  currentDiscipline: {}
}

export default function disciplineReducer (state=defaultState, action) {
  switch (action.type) {
    case SET_LOADING_DISCIPLINE:
      return {
        ...state,
        isLoading: action.payload
      }
    case SET_DISCIPLINES:
      return {
        ...state,
        disciplines: action.payload,
        isLoading: false
      }
    default:
      return state
  }
}

// action creators
export const setLoadingDiscipline = loading => ({type: SET_LOADING_DISCIPLINE, payload: loading});
export const setDisciplines = disciplines => ({type: SET_DISCIPLINES, payload: disciplines});