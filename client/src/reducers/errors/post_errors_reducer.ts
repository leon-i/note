import { RECEIVE_POST, 
RECEIVE_POST_ERRORS, 
CLEAR_POST_ERRORS, 
PostActionTypes, 
PostErrorActionTypes } from '../../actions/post_actions';

export default (state=null, action : PostActionTypes | PostErrorActionTypes) => {
    switch(action.type) {
        case RECEIVE_POST:
            return null;
        case RECEIVE_POST_ERRORS:
            return action.payload;
        case CLEAR_POST_ERRORS:
            return null;
        default:
            return state;
    }
}