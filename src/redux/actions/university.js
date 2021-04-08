import {setLoading, setUniversities} from "../reducers/universityReducer";
import {universitiesAPI} from "../../api/universities";

export const fetchUniversities = () => async dispatch  => {
  try {
    dispatch(setLoading(true));
    const {data} = await universitiesAPI.getUniversities();
    dispatch(setUniversities(data));
  } catch(e) {
    alert(e.response.data.message)
  }


};