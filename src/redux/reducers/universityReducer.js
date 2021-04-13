import {
  SET_UNIVERSITIES,
  SET_LOADING,
  SET_SINGLE_UNIVERSITY,
  UPDATE_SINGLE_UNIVERSITY,
  DELETE_UNIVERSITY, SEARCH_QUERY_UNIVERSITY, SEARCH_DATA_UNIVERSITY
} from "../types";

const defaultState = {
  universities: [],
  isLoading: false,
  currentUniversity: {},
  search: '',
  searchData: []
}

export default function userReducer (state=defaultState, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    case SET_UNIVERSITIES:
      return {
        ...state,
        universities: action.payload,
        isLoading: false
      }
    case SET_SINGLE_UNIVERSITY:
      return {
        ...state,
        currentUniversity: action.payload,
        isLoading: false
      }
    case UPDATE_SINGLE_UNIVERSITY:
      return {
        ...state,
        currentUniversity: {
          ...state.currentUniversity,
          [Object.keys(action.payload)[0]]: Object.values(action.payload)[0]
        },
      }
    case DELETE_UNIVERSITY:
      return {
        ...state,
        universities: state.universities.filter(item => item.id !== action.payload),
      }
    case SEARCH_QUERY_UNIVERSITY:
      return {
        ...state,
        search: action.payload
    }
    case SEARCH_DATA_UNIVERSITY:
      return {
        ...state,
        searchData: action.payload
      }
    default:
      return state
  }
}


// action creators
export const setUniversities = universities => ({type: SET_UNIVERSITIES, payload: universities});
export const setCurrentUniversity = university => ({type: SET_SINGLE_UNIVERSITY, payload: university});
export const updateSingleUniversityAC = obj => ({type: UPDATE_SINGLE_UNIVERSITY, payload: obj});
export const deleteUniversityAC = id => ({type: DELETE_UNIVERSITY, payload: id});
export const setLoading = loading => ({type: SET_LOADING, payload: loading});
export const searchQueryUniversity = searchQuery => ({type: SEARCH_QUERY_UNIVERSITY, payload: searchQuery});
export const setSearchDataUniversity = searchData => ({type: SEARCH_DATA_UNIVERSITY, payload: searchData});
