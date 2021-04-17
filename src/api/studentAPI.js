import {instance} from "./index";

export const studentAPI = {
  getStudents(departmentId=null) {
    return instance.get(`students/?expand=department&${
      departmentId !== null ? `departmentId=${departmentId}` : ''}`);
  },

  getStudent(id) {
    return instance.get(`students/${id}`)
  },

  editStudent(id, object) {
    return instance.patch(`students/${id}`, object)
  },

  deleteStudent(id) {
    return instance.delete(`students/${id}`)
  },

  addStudent(student) {
    return instance.post(`students/`, student)
  }
}