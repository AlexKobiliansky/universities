import {instance} from "./index";


export const teacherAPI = {
  getTeachers(departmentId=null) {
    return instance.get(`teachers/?expand=department&${
      departmentId !== null ? `departmentId=${departmentId}` : ''}`);
  },

  getTeacher(id) {
    return instance.get(`teachers/${id}?expand=department`)
  },

  editTeacher(id, object) {
    return instance.patch(`teachers/${id}`, object)
  },

  deleteTeacher(id) {
    return instance.delete(`teachers/${id}`)
  },

  addTeacher(teacher) {
    return instance.post(`teachers/`, teacher)
  }
}