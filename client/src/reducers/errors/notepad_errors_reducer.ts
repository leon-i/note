import { RECEIVE_NOTEPAD, 
RECEIVE_NOTEPAD_ERRORS, 
CLEAR_NOTEPAD_ERRORS, 
NotepadActionTypes, 
NotepadErrorActionTypes } from '../../actions/notepad_actions';

export default (state=null, action : NotepadActionTypes | NotepadErrorActionTypes) => {
    switch(action.type) {
        case RECEIVE_NOTEPAD:
            return null;
        case RECEIVE_NOTEPAD_ERRORS:
            return action.payload;
        case CLEAR_NOTEPAD_ERRORS:
            return null;
        default:
            return state;
    }
}