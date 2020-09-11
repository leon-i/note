import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import notepadsReducer from './notepads_reducer';

export default combineReducers({
    users: usersReducer,
    notepads: notepadsReducer
})