import { combineReducers } from 'redux';
import sessionErrorsReducer from './session_errors_reducer';
import notepadErrorsReducer from './notepad_errors_reducer';

export default combineReducers({
    session: sessionErrorsReducer,
    notepad: notepadErrorsReducer
});