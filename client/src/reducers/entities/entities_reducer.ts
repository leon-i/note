import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import notepadsReducer from './notepads_reducer';
import postsReducer from './posts_reducer';

export default combineReducers({
    users: usersReducer,
    notepads: notepadsReducer,
    posts: postsReducer
});

export type NotepadState = ReturnType<typeof notepadsReducer>