import {
  deleteUniversityAC,
  setCurrentUniversity,
  setLoading,
  setUniversities,
  updateSingleUniversityAC
} from "../reducers/universityReducer";
import {universitiesAPI} from "../../api/universities";
import {univerAPI} from "../../api/univerAPI";

export const fetchUniversities = () => async dispatch  => {
  try {
    dispatch(setLoading(true));
    const {data} = await universitiesAPI.getUniversities();
    dispatch(setUniversities(data));
  } catch(e) {
    alert(e.response.data.message)
  }
};

export const fetchSingleUniversity = (univerId) => async dispatch  => {
  try {
    dispatch(setLoading(true));
    const {data} = await univerAPI.getUniver(univerId);
    dispatch(setCurrentUniversity(data));
  } catch(e) {
    alert(e.message)
  }
};

export const updateSingleUniversity = (univerId, obj) => async dispatch  => {
  try {
    univerAPI.editUniver(univerId, obj);
    dispatch(updateSingleUniversityAC(obj));
  } catch(e) {
    alert(`Не удалось обновить данные: ${e.message}`)
  }
};

export const deleteUniversity = (id) => async dispatch  => {
  try {
    await univerAPI.deleteUniver(id);
    dispatch(deleteUniversityAC(id));
  } catch(e) {
    alert(`Не удалось удалить университет: ${e.message}`)
  }
};