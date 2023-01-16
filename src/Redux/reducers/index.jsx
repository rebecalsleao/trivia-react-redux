import { combineReducers } from 'redux';
import userReducer from './userReducer';
import player from './player';

const rootReducer = combineReducers({ userReducer, player });

export default rootReducer;
