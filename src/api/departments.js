import {instance} from "./index";

export const departmentsAPI = {
  getDepartments(univerId=null) {
    return instance.get(`departments/?expand=university&${
      univerId !== null ? `universityId=${univerId}` : ''}`);
  },

  deleteDepartment(id) {
    return instance.delete(`departments/${id}`)
  },
}