import {instance} from "./index";

export const studentAPI = {
  getStudents(departmentId=null) {
    return instance.get(`students/?expand=department&${
      departmentId !== null ? `departmentId=${departmentId}` : ''}`);
  },

  deleteStudent(id) {
    return instance.delete(`students/${id}`)
  },
}