import {instance} from "./index";

export const univerAPI = {
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