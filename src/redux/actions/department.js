import {departmentsAPI} from "../../api/departments";
import {deleteDepartmentAC, setDepartments, setLoading} from "../reducers/departmentReducer";

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