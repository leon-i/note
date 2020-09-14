import { RECEIVE_POSTS, RECEIVE_POST, RECEIVE_CURRENT_POST, PostActionTypes } from '../../actions/post_actions';
import { Post } from '../../interfaces';

export default (state=[], action : PostActionTypes) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_POSTS:
            return action.payload ? action.payload : [];
        case RECEIVE_POST:
            return [action.payload, ...state];
        case RECEIVE_CURRENT_POST:
            return [action.payload];
        default:
            return state;
    }
}