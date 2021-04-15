import {instance} from "./index";

export const universityAPI = {

  getUniversities() {
    return instance.get(`universities/`);
  },

  getUniver(id) {
    return instance.get(`universities/${id}`)
  },

  editUniver(id, object) {
    return instance.patch(`universities/${id}`, object)
  },

  deleteUniver(id) {
    return instance.delete(`universities/${id}`)
  },

  addUniver(univer) {
    return instance.post(`universities/`, univer)
  }
}