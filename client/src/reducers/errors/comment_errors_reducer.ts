import { RECEIVE_COMMENT, 
RECEIVE_COMMENT_ERRORS, 
CLEAR_COMMENT_ERRORS, 
CommentActionTypes, 
CommentErrorActionTypes } from '../../actions/comment_actions';

export default (state=null, action : CommentActionTypes | CommentErrorActionTypes) => {
    switch(action.type) {
        case RECEIVE_COMMENT:
            return null;
        case RECEIVE_COMMENT_ERRORS:
            return action.payload;
        case CLEAR_COMMENT_ERRORS:
            return null;
        default:
            return state;
    }
}