import { Dispatch } from 'redux';
import jwt_decode from 'jwt-decode';
import { User, NewUser, LoginInput } from '../interfaces';
import * as UserAPIUtil from '../util/user_api_util';

export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_SESSION_ERRORS = 'CLEAR_SESSION_ERRORS';
export const LOGOUT_USER = "LOGOUT_USER";

interface ReceiveCurrentUserAction {
    type: typeof RECEIVE_USER,
    payload: User
};

interface LogoutCurrentUserAction {
    type: typeof LOGOUT_USER
};

interface ReceiveSessionErrorsAction {
    type: typeof RECEIVE_SESSION_ERRORS,
    payload: any
};

interface ClearSessionErrorsAction {
    type: typeof CLEAR_SESSION_ERRORS
};

export type UserActionTypes = ReceiveCurrentUserAction | LogoutCurrentUserAction;
export type ErrorActionTypes = ReceiveSessionErrorsAction | ClearSessionErrorsAction

const receiveCurrentUser = (user : User) : ReceiveCurrentUserAction => ({
    type: RECEIVE_USER,
    payload: user
});

const receiveSessionErrors = (errors : any) : ReceiveSessionErrorsAction => ({
    type: RECEIVE_SESSION_ERRORS,
    payload: errors
});

export const clearSessionErrors = () : ClearSessionErrorsAction => ({
    type: CLEAR_SESSION_ERRORS
});

const logoutCurrentUser = () : LogoutCurrentUserAction  => ({
    type: LOGOUT_USER
});

export const register : any = (user : NewUser) => (dispatch : Dispatch) => (
    UserAPIUtil.register(user).then((res) => {
        const token = res.data.data;
        localStorage.setItem('jwtToken', token);
        UserAPIUtil.setAuthToken(token);
        const decoded : User = jwt_decode(token);
        dispatch(receiveCurrentUser(decoded));
    }).catch(err => {
        dispatch(receiveSessionErrors(err.response.data.data))
    })
);

export const login : any = (user : LoginInput) => (dispatch : Dispatch) => (
    UserAPIUtil.login(user).then(res => {
        const token = res.data.data;
        localStorage.setItem('jwtToken', token);
        UserAPIUtil.setAuthToken(token);
        const decoded : User = jwt_decode(token);
        dispatch(receiveCurrentUser(decoded))
    })
    .catch(err => {
        dispatch(receiveSessionErrors(err.response.data.data));
    })
);

export const logout : any = () => (dispatch : Dispatch) => {
    localStorage.removeItem('jwtToken');
    UserAPIUtil.setAuthToken(false);
    dispatch(logoutCurrentUser());
};