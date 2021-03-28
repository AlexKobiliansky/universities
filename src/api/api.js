import * as axios from "axios";

const baseUrl = 'http://localhost:3001/'

const instance = axios.create({
  baseURL: baseUrl,
});

export const universitiesAPI = {
  getUniversities() {
    return instance.get(`universities/`);
  }
}

export const departmentsAPI = {
  getDepartments() {
    return instance.get(`departments/?expand=university`);
  }
}

export const univerAPI = {
  getUniver(id) {
    return instance.get(`universities/${id}?embed=departments`)
  },

  editUniver(id, object) {
    return instance.patch(`http://localhost:3001/universities/${id}`, object)
  }
}