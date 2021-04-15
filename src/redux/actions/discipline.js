import {disciplineAPI} from "../../api/disciplineAPI";
import {deleteDisciplineAC, setDisciplines, setLoadingDiscipline} from "../reducers/disciplineReducer";

export const fetchDisciplines = (id) => async dispatch  => {
  try {
    dispatch(setLoadingDiscipline(true));
    const {data} = await disciplineAPI.getDisciplines(id);
    dispatch(setDisciplines(data));
  } catch(e) {
    alert(`Ошибка при загрузке дисциплин: ${e.message}`)
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