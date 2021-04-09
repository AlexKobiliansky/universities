import {combineReducers} from 'redux';

import userReducer from './userReducer';
import universityReducer from './universityReducer';
import departmentReducer from "./departmentReducer";

const rootReducer = combineReducers({
    user: userReducer,
    university: universityReducer,
    department: departmentReducer
});

export default rootReducer;