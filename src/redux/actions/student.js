import {deleteStudentAC, setLoadingStudent, setStudents} from "../reducers/studentReducer";
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

export const deleteStudent = (id) => async dispatch  => {
  try {
    console.log(id)
    await studentAPI.deleteStudent(id);
    dispatch(deleteStudentAC(id));
  } catch(e) {
    alert(`Не удалось удалить студента: ${e.message}`)
  }
};