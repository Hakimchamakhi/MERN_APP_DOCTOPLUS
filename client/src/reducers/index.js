import {combineReducers} from 'redux';
import auth from './auth_reducer'
import data_red from './data_reducer'

export default combineReducers({
    auth, data_red
});