import { RECEIVE_USER, UserActionTypes } from '../../actions/user_actions';

export default (state={}, action : UserActionTypes) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_USER:
            return Object.assign({}, state, { [action.payload.user_id]: action.payload });
        default:
            return state;
    }
}