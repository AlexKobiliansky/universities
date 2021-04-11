import {departmentsAPI} from "../../api/departmentsAPI";
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
    const {data} = await departmentsAPI.getDepartments(id);
    dispatch(setDepartments(data));
  } catch(e) {
    alert(e.response.data.message)
  }
};

export const deleteDepartment = (id) => async dispatch  => {
  try {
    await departmentsAPI.deleteDepartment(id);
    dispatch(deleteDepartmentAC(id));
  } catch(e) {
    alert(`Не удалось удалить факультет: ${e.message}`)
  }
};

export const fetchSingleDepartment = (id) => async dispatch  => {
  try {
    dispatch(setLoading(true));
    const {data} = await departmentsAPI.getDepartment(id);
    dispatch(setSingleDepartmentAC(data));
    return data;
  } catch(e) {
    alert(e.message)
  }
};


export const updateDepartment = (id, obj) => async dispatch  => {
  try {
    await departmentsAPI.editDepartment(id, obj);
    dispatch(updateDepartmentAC(obj));
  } catch(e) {
    alert(`Не удалось обновить данные: ${e.message}`)
  }
};