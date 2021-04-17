import {
  deleteStudentAC,
  setLoadingStudent,
  setSingleStudentAC,
  setStudents,
  updateStudentAC
} from "../reducers/studentReducer";
import {studentAPI} from "../../api/studentAPI";

export const fetchStudents = (id) => async dispatch  => {
  try {
    dispatch(setLoadingStudent(true));
    const {data} = await studentAPI.getStudents(id);
    dispatch(setStudents(data));
  } catch(e) {
    alert(`Ошибка при загрузке списка студентов: ${e.message}`)
  }
};

export const fetchSingleStudent = (id) => async dispatch  => {
  try {
    dispatch(setLoadingStudent(true));
    const {data} = await studentAPI.getStudent(id);
    dispatch(setSingleStudentAC(data));
  } catch(e) {
    alert(e.message)
  }
};

export const updateStudent = (studentId, obj) => async dispatch  => {
  try {
    studentAPI.editStudent(studentId, obj);
    dispatch(updateStudentAC(obj));
  } catch(e) {
    alert(`Не удалось обновить данные: ${e.message}`)
  }
};

export const deleteStudent = (id) => async dispatch  => {
  try {
    await studentAPI.deleteStudent(id);
    dispatch(deleteStudentAC(id));
  } catch(e) {
    alert(`Не удалось удалить студента: ${e.message}`)
  }
};