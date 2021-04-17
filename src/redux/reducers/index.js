import {combineReducers} from 'redux';

import userReducer from './userReducer';
import universityReducer from './universityReducer';
import departmentReducer from "./departmentReducer";
import disciplineReducer from "./disciplineReducer";
import studentReducer from "./studentReducer";
import teacherReducer from "./teacherReducer";

const rootReducer = combineReducers({
    user: userReducer,
    university: universityReducer,
    department: departmentReducer,
    discipline: disciplineReducer,
    student: studentReducer,
    teacher: teacherReducer
});

export default rootReducer;