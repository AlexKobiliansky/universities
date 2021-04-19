import {
  DELETE_DISCIPLINE, SEARCH_DATA_DEPARTMENT, SEARCH_DATA_DISCIPLINE, SEARCH_QUERY_DEPARTMENT, SEARCH_QUERY_DISCIPLINE,
  SET_DISCIPLINES,
  SET_LOADING_DISCIPLINE,
  SET_SINGLE_DISCIPLINE, UPDATE_DISCIPLINE
} from "../types";

const defaultState = {
  departments: [],
  isLoading: false,
  currentDiscipline: {},
  search: '',
  searchData: [],
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
    case SET_SINGLE_DISCIPLINE:
      return {
        ...state,
        currentDiscipline: action.payload,
        isLoading: false
      }
    case UPDATE_DISCIPLINE:
      return {
        ...state,
        currentDiscipline: {
          ...state.currentDiscipline,
          [Object.keys(action.payload)[0]]: Object.values(action.payload)[0]
        },
      }
    case DELETE_DISCIPLINE:
      return {
        ...state,
        disciplines: state.disciplines.filter(item => item.id !== action.payload),
      }
    case SEARCH_QUERY_DISCIPLINE:
      return {
        ...state,
        search: action.payload
      }
    case SEARCH_DATA_DISCIPLINE:
      return {
        ...state,
        searchData: action.payload
      }
    default:
      return state
  }
}

// action creators
export const setLoadingDiscipline = loading => ({type: SET_LOADING_DISCIPLINE, payload: loading});
export const setDisciplines = disciplines => ({type: SET_DISCIPLINES, payload: disciplines});
export const setSingleDisciplineAC = department => ({type: SET_SINGLE_DISCIPLINE, payload: department});
export const updateDisciplineAC = obj => ({type: UPDATE_DISCIPLINE, payload: obj});
export const deleteDisciplineAC = id => ({type: DELETE_DISCIPLINE, payload: id});
export const searchQueryDiscipline = searchQuery => ({type: SEARCH_QUERY_DISCIPLINE, payload: searchQuery});
export const setSearchDataDiscipline = searchData => ({type: SEARCH_DATA_DISCIPLINE, payload: searchData});