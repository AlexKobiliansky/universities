import {combineReducers} from 'redux';

import userReducer from './userReducer';
import universityReducer from './universityReducer'

const rootReducer = combineReducers({
    user: userReducer,
    university: universityReducer
});

export default rootReducer;