import {disciplineAPI} from "../../api/disciplineAPI";
import {setDisciplines, setLoadingDiscipline} from "../reducers/disciplineReducer";

export const fetchDisciplines = (id) => async dispatch  => {
  try {
    dispatch(setLoadingDiscipline(true));
    const {data} = await disciplineAPI.getDisciplines(id);
    dispatch(setDisciplines(data));
  } catch(e) {
    alert(`Ошибка при загрузке дисциплин: ${e.message}`)
  }
};