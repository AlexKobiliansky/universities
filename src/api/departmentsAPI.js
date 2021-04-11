import {instance} from "./index";

export const departmentsAPI = {
  getDepartments(univerId=null) {
    return instance.get(`departments/?expand=university&${
      univerId !== null ? `universityId=${univerId}` : ''}`);
  },

  getDepartment(id) {
    return instance.get(`departments/${id}`)
  },

  editDepartment(id, object) {
    return instance.patch(`departments/${id}`, object)
  },

  deleteDepartment(id) {
    return instance.delete(`departments/${id}`)
  },

  addDepartment(department) {
    return instance.post(`departments/`, department)
  }
}