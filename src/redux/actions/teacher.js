import {deleteTeacherAC, setLoadingTeacher, setTeachers} from "../reducers/teacherReducer";
import {teacherAPI} from "../../api/teacherAPI";

export const fetchTeachers = (id) => async dispatch  => {
  try {
    dispatch(setLoadingTeacher(true));
    const {data} = await teacherAPI.getTeachers(id);
    dispatch(setTeachers(data));
  } catch(e) {
    alert(`Ошибка при загрузке списка преподавателей: ${e.message}`)
  }
};


export const deleteTeacher = (id) => async dispatch  => {
  try {
    await teacherAPI.deleteTeacher(id);
    dispatch(deleteTeacherAC(id));
  } catch(e) {
    alert(`Не удалось удалить преподавателя: ${e.message}`)
  }
};