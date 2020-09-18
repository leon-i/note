import { RECEIVE_COMMENTS, RECEIVE_COMMENT, CommentActionTypes } from '../../actions/comment_actions';

export default (state=[], action : CommentActionTypes) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_COMMENTS:
            return action.payload ? action.payload : [];
        case RECEIVE_COMMENT:
            return [...state, action.payload];
        default:
            return state;
    }
}