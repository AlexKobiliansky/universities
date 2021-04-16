import {instance} from "./index";

export const disciplineAPI = {
  getDisciplines(departmentId=null) {
    return instance.get(`disciplines/?expand=department&${
      departmentId !== null ? `departmentId=${departmentId}` : ''}`);
  },

  getDiscipline(id) {
    return instance.get(`disciplines/${id}?expand=department`)
  },

  editDiscipline(id, object) {
    return instance.patch(`disciplines/${id}`, object)
  },

  deleteDiscipline(id) {
    return instance.delete(`disciplines/${id}`)
  },

  addDiscipline(discipline) {
    return instance.post(`disciplines/`, discipline)
  }
}