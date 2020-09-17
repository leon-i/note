import { Dispatch } from 'redux';
import { Comment } from '../interfaces';
import * as CommentAPIUtil from '../util/comment_api_util';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const RECEIVE_COMMENT_ERRORS = 'RECEIVE_COMMENT_ERRORS';
export const CLEAR_COMMENT_ERRORS = 'CLEAR_COMMENT_ERRORS';

interface ReceiveCommentsAction {
    type: typeof RECEIVE_COMMENTS,
    payload: Comment[]
};

interface ReceiveCommentAction {
    type: typeof RECEIVE_COMMENT,
    payload: Comment
};

interface ReceiveCommentErrorsAction {
    type: typeof RECEIVE_COMMENT_ERRORS,
    payload: any
};

interface ClearCommentErrorsAction {
    type: typeof CLEAR_COMMENT_ERRORS
};

export type CommentActionTypes = ReceiveCommentsAction | ReceiveCommentAction;
export type CommentErrorActionTypes = ReceiveCommentErrorsAction | ClearCommentErrorsAction;

export const receiveComments = (payload : Comment[]) : CommentActionTypes => ({
    type: RECEIVE_COMMENTS,
    payload
});

const receiveComment = (payload : Comment) : CommentActionTypes => ({
    type: RECEIVE_COMMENT,
    payload
});

const receiveCommentErrors = (payload: any) => ({
    type: RECEIVE_COMMENT_ERRORS,
    payload
});

export const clearCommentErrors = () => ({
    type: CLEAR_COMMENT_ERRORS
});

export const fetchComments : any = () => (dispatch : Dispatch) =>
    CommentAPIUtil.fetchComments().then(res => dispatch(receiveComments(res.data)))

export const fetchComment : any = (id : number) => (dispatch : Dispatch) =>
    CommentAPIUtil.fetchComment(id).then(res => dispatch(receiveComment(res.data)))

export const createComment : any = (newComment : FormData) => (dispatch : Dispatch) =>
    CommentAPIUtil.createComment(newComment).then(res => dispatch(receiveComment(res.data)))
        .catch(err => dispatch(receiveCommentErrors(err.response.data?.data || err.response.data)))

export const deleteComment = (id : number) => (dispatch : Dispatch) =>
    CommentAPIUtil.deleteComment(id).then(res => dispatch(receiveComment(res.data.data)))