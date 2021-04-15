import {instance} from "./index";

export const disciplineAPI = {
  getDisciplines(departmentId=null) {
    return instance.get(`disciplines/?expand=department&${
      departmentId !== null ? `departmentId=${departmentId}` : ''}`);
  },
}