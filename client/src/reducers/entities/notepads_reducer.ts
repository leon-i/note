import { RECEIVE_NOTEPADS, RECEIVE_NOTEPAD, NotepadActionTypes } from '../../actions/notepad_actions';
import { Notepad } from '../../interfaces';

type NotepadObj = {
    [id : number]: Notepad;
}

const convertToObject = (arr : Notepad[]) => {
    const result : NotepadObj = {};
    arr.forEach((notepad) => result[notepad.ID] = notepad);
    return result;
}

export default (state={}, action : NotepadActionTypes) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_NOTEPADS:
            return Object.assign({}, state, convertToObject(action.payload));
        case RECEIVE_NOTEPAD:
            return Object.assign({}, state, { [action.payload.ID]: action.payload });
        default:
            return state;
    }
}