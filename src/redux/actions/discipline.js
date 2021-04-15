import {disciplineAPI} from "../../api/disciplineAPI";
import {
  deleteDisciplineAC,
  setDisciplines,
  setLoadingDiscipline,
  setSingleDisciplineAC, updateDisciplineAC
} from "../reducers/disciplineReducer";

export const fetchDisciplines = (id) => async dispatch  => {
  try {
    dispatch(setLoadingDiscipline(true));
    const {data} = await disciplineAPI.getDisciplines(id);
    dispatch(setDisciplines(data));
  } catch(e) {
    alert(`Ошибка при загрузке дисциплин: ${e.message}`)
  }
};

export const fetchSingleDiscipline = (id) => async dispatch  => {
  try {
    dispatch(setLoadingDiscipline(true));
    const {data} = await disciplineAPI.getDiscipline(id);
    dispatch(setSingleDisciplineAC(data));
    return data;
  } catch(e) {
    alert(e.message)
  }
};

export const updateDiscipline = (id, obj) => async dispatch  => {
  try {
    await disciplineAPI.editDiscipline(id, obj);
    dispatch(updateDisciplineAC(obj));
  } catch(e) {
    alert(`Не удалось обновить данные: ${e.message}`)
  }
};

export const deleteDiscipline = (id) => async dispatch  => {
  try {
    await disciplineAPI.deleteDiscipline(id);
    dispatch(deleteDisciplineAC(id));
  } catch(e) {
    alert(`Не удалось удалить дисциплину: ${e.message}`)
  }
};