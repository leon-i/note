import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import notepadsReducer from './notepads_reducer';
import postsReducer from './posts_reducer';
import commentsReducer from './comments_reducer';

export default combineReducers({
    users: usersReducer,
    notepads: notepadsReducer,
    posts: postsReducer,
    comments: commentsReducer
});

export type NotepadState = ReturnType<typeof notepadsReducer>