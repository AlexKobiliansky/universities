import {instance} from "./index";

export const universitiesAPI = {
  getUniversities() {
    return instance.get(`universities/`);
  }
}