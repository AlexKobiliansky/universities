import {
  deleteUniversityAC,
  setCurrentUniversity,
  setLoading,
  setUniversities,
  updateSingleUniversityAC
} from "../reducers/universityReducer";
import {universityAPI} from "../../api/universityAPI";

export const fetchUniversities = () => async dispatch  => {
  try {
    dispatch(setLoading(true));
    const {data} = await universityAPI.getUniversities();
    dispatch(setUniversities(data));
  } catch(e) {
    alert(`Ошибка при загрузке университетов: ${e.message}`)
  }
};

export const fetchSingleUniversity = (univerId) => async dispatch  => {
  try {
    dispatch(setLoading(true));
    const {data} = await universityAPI.getUniver(univerId);
    dispatch(setCurrentUniversity(data));
  } catch(e) {
    alert(e.message)
  }
};

export const updateSingleUniversity = (univerId, obj) => async dispatch  => {
  try {
    universityAPI.editUniver(univerId, obj);
    dispatch(updateSingleUniversityAC(obj));
  } catch(e) {
    alert(`Не удалось обновить данные: ${e.message}`)
  }
};

export const deleteUniversity = (id) => async dispatch  => {
  try {
    await universityAPI.deleteUniver(id);
    dispatch(deleteUniversityAC(id));
  } catch(e) {
    alert(`Не удалось удалить университет: ${e.message}`)
  }
};