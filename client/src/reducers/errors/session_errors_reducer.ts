import { RECEIVE_USER, RECEIVE_SESSION_ERRORS, CLEAR_SESSION_ERRORS, UserActionTypes, ErrorActionTypes } from '../../actions/user_actions';

export default (state={}, action : UserActionTypes | ErrorActionTypes) => {
    switch(action.type) {
        case RECEIVE_USER:
            return {};
        case CLEAR_SESSION_ERRORS:
            return {};
        case RECEIVE_SESSION_ERRORS:
            return action.payload;
        default:
            return state;
    }
}