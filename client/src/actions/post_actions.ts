import { Dispatch } from 'redux';
import { Post, NewPost } from '../interfaces';
import * as PostAPIUtil from '../util/post_api_util';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_CURRENT_POST = 'RECEIVE_CURRENT_POST';
export const RECEIVE_POST_ERRORS = 'RECEIVE_POST_ERRORS';
export const CLEAR_POST_ERRORS = 'CLEAR_POST_ERRORS';

interface ReceivePostsAction {
    type: typeof RECEIVE_POSTS,
    payload: Post[]
};

interface ReceivePostAction {
    type: typeof RECEIVE_POST,
    payload: Post
};

interface ReceiveCurrentPostAction {
    type: typeof RECEIVE_CURRENT_POST,
    payload: Post
}

interface ReceivePostErrorsAction {
    type: typeof RECEIVE_POST_ERRORS,
    payload: any
};

interface ClearPostErrorsAction {
    type: typeof CLEAR_POST_ERRORS
};

export type PostActionTypes = ReceivePostsAction | ReceivePostAction | ReceiveCurrentPostAction;
export type PostErrorActionTypes = ReceivePostErrorsAction | ClearPostErrorsAction;

export const receivePosts = (payload : Post[]) : PostActionTypes => ({
    type: RECEIVE_POSTS,
    payload
});

const receivePost = (payload : Post) : PostActionTypes => ({
    type: RECEIVE_POST,
    payload
});

const receiveCurrentPost = (payload : Post) : PostActionTypes => ({
    type: RECEIVE_CURRENT_POST,
    payload
});

const receivePostErrors = (payload: any) => ({
    type: RECEIVE_POST_ERRORS,
    payload
});

export const clearPostErrors = () => ({
    type: CLEAR_POST_ERRORS
});

export const fetchPosts : any = () => (dispatch : Dispatch) =>
    PostAPIUtil.fetchPosts().then(res => dispatch(receivePosts(res.data)))

export const fetchPost : any = (id : number) => (dispatch : Dispatch) =>
    PostAPIUtil.fetchPost(id).then(res => dispatch(receiveCurrentPost(res.data)))

export const createPost : any = (newPost : NewPost) => (dispatch : Dispatch) =>
    PostAPIUtil.createPost(newPost).then(res => dispatch(receivePost(res.data)))
    .catch(err => dispatch(receivePostErrors(err.response.data?.data || "Log in to create a post")))

export const deletePost = (id : number) => (dispatch : Dispatch) =>
    PostAPIUtil.deletePost(id).then(res => dispatch(receivePost(res.data.data)))