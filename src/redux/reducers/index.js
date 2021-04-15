import {combineReducers} from 'redux';

import userReducer from './userReducer';
import universityReducer from './universityReducer';
import departmentReducer from "./departmentReducer";
import disciplineReducer from "./disciplineReducer";

const rootReducer = combineReducers({
    user: userReducer,
    university: universityReducer,
    department: departmentReducer,
    discipline: disciplineReducer

});

export default rootReducer;