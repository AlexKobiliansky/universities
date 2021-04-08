import {SET_UNIVERSITIES, SET_LOADING} from "../types";

const defaultState = {
  universities: [],
  isLoading: false
}

export default function userReducer (state=defaultState, action) {
  switch (action.type) {
    case SET_UNIVERSITIES:
      return {
        ...state,
        universities: action.payload,
        isLoading: false
      }
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    default:
      return state
  }
}


// action creators
export const setUniversities = universities => ({type: SET_UNIVERSITIES, payload: universities});
export const setLoading = loading => ({type: SET_LOADING, payload: loading})
