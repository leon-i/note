import { RECEIVE_NOTEPADS, RECEIVE_NOTEPAD, NotepadActionTypes } from '../../actions/notepad_actions';

export default (state=[], action : NotepadActionTypes) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_NOTEPADS:
            return action.payload;
        case RECEIVE_NOTEPAD:
            return [...state, action.payload];
        default:
            return state;
    }
}