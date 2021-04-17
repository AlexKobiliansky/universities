import {
  deleteTeacherAC,
  setLoadingTeacher,
  setSingleTeacherAC,
  setTeachers,
  updateTeacherAC
} from "../reducers/teacherReducer";
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

export const fetchSingleTeacher = (id) => async dispatch  => {
  try {
    dispatch(setLoadingTeacher(true));
    const {data} = await teacherAPI.getTeacher(id);
    dispatch(setSingleTeacherAC(data));
  } catch(e) {
    alert(e.message)
  }
};

export const updateTeacher = (teacherId, obj) => async dispatch  => {
  try {
    teacherAPI.editTeacher(teacherId, obj);
    dispatch(updateTeacherAC(obj));
  } catch(e) {
    alert(`Не удалось обновить данные: ${e.message}`)
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