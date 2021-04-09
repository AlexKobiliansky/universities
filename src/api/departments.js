import {instance} from "./index";

export const departmentsAPI = {
  getDepartments() {
    return instance.get(`departments/?expand=university`);
  },

  deleteDepartment(id) {
    return instance.delete(`departments/${id}`)
  },
}