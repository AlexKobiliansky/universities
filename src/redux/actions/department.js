import {departmentAPI} from "../../api/departmentAPI";
import {
  deleteDepartmentAC,
  setDepartments,
  setLoading,
  setSingleDepartmentAC,
  updateDepartmentAC
} from "../reducers/departmentReducer";

export const fetchDepartments = (id) => async dispatch  => {
  try {
    dispatch(setLoading(true));
    const {data} = await departmentAPI.getDepartments(id);
    dispatch(setDepartments(data));
  } catch(e) {
    alert(`Ошибка при загрузке факультетов: ${e.message}`)
  }
};

export const deleteDepartment = (id) => async dispatch  => {
  try {
    await departmentAPI.deleteDepartment(id);
    dispatch(deleteDepartmentAC(id));
  } catch(e) {
    alert(`Не удалось удалить факультет: ${e.message}`)
  }
};

export const fetchSingleDepartment = (id) => async dispatch  => {
  try {
    dispatch(setLoading(true));
    const {data} = await departmentAPI.getDepartment(id);
    dispatch(setSingleDepartmentAC(data));
    return data;
  } catch(e) {
    alert(e.message)
  }
};


export const updateDepartment = (id, obj) => async dispatch  => {
  try {
    await departmentAPI.editDepartment(id, obj);
    dispatch(updateDepartmentAC(obj));
  } catch(e) {
    alert(`Не удалось обновить данные: ${e.message}`)
  }
};