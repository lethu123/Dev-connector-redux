import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';
import errorsReducer from './/errorsReducer';
import postsReducer from './postsReducer';
import loadingReducer from './loadingReducer';

const rootReducer = combineReducers({
    loginReducer,
    registerReducer,
    authReducer,
    userReducer,
    errorsReducer,
    postsReducer,
    loadingReducer
})
export default rootReducer;