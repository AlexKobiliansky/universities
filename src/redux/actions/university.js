import {
  setCurrentUniversity,
  setLoading,
  setUniversities,
  updateSingleUniversityAC
} from "../reducers/universityReducer";
import {universitiesAPI} from "../../api/universities";
import {univerAPI} from "../../api/univer";

export const fetchUniversities = () => async dispatch  => {
  try {
    dispatch(setLoading(true));
    const {data} = await universitiesAPI.getUniversities();
    dispatch(setUniversities(data));
  } catch(e) {
    alert(e.response.data.message)
  }
};

export const fetchSingleUniversity = (univerId) => async dispatch  => {
  try {
    dispatch(setLoading(true));
    const {data} = await univerAPI.getUniver(univerId);
    dispatch(setCurrentUniversity(data));
  } catch(e) {
    alert(e.response.data.message)
  }
};


export const updateSingleUniversity = (univerId, obj) => async dispatch  => {
  try {
    // dispatch(setLoading(true));
    univerAPI.editUniver(univerId, obj).then(() => dispatch(updateSingleUniversityAC(obj))).catch((e) => {
      alert(e.message);
    });
  } catch(e) {
    alert(e.response.data.message)
  }
};