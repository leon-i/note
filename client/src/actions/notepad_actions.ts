import { Dispatch } from 'redux';
import { Notepad, NewNotepad } from '../interfaces';
import * as NotepadAPIUtil from '../util/notepad_util';
import { receivePosts } from './post_actions';

export const RECEIVE_NOTEPADS = 'RECEIVE_NOTEPADS';
export const RECEIVE_NOTEPAD = 'RECEIVE_NOTEPAD';
export const RECEIVE_NOTEPAD_ERRORS = 'RECEIVE_NOTEPAD_ERRORS';
export const CLEAR_NOTEPAD_ERRORS = 'CLEAR_NOTEPAD_ERRORS';

interface ReceiveNotepadsAction {
    type: typeof RECEIVE_NOTEPADS,
    payload: Notepad[]
};

interface ReceiveNotepadAction {
    type: typeof RECEIVE_NOTEPAD,
    payload: Notepad
};

interface ReceiveNotepadErrorsAction {
    type: typeof RECEIVE_NOTEPAD_ERRORS,
    payload: any
};

interface ClearNotepadErrorsAction {
    type: typeof CLEAR_NOTEPAD_ERRORS
};

export type NotepadActionTypes = ReceiveNotepadsAction | ReceiveNotepadAction;
export type NotepadErrorActionTypes = ReceiveNotepadErrorsAction | ClearNotepadErrorsAction;

const receiveNotepads = (payload : Notepad[]) : NotepadActionTypes => ({
    type: RECEIVE_NOTEPADS,
    payload
});

const receiveNotepad = (payload : Notepad) : NotepadActionTypes => ({
    type: RECEIVE_NOTEPAD,
    payload
});

const receiveNotepadErrors = (payload: any) => ({
    type: RECEIVE_NOTEPAD_ERRORS,
    payload
});

export const clearNotepadErrors = () => ({
    type: CLEAR_NOTEPAD_ERRORS
});

export const fetchNotepads : any = () => (dispatch : Dispatch) =>
    NotepadAPIUtil.fetchNotepads().then(res => dispatch(receiveNotepads(res.data)))

export const fetchNotepad : any = (id : number) => (dispatch : Dispatch) =>
    NotepadAPIUtil.fetchNotepad(id).then(res => {
        dispatch(receiveNotepad(res.data.notepad))
        dispatch(receivePosts(res.data.posts))
    })

export const createNotepad : any = (newNotepad : NewNotepad) => (dispatch : Dispatch) =>
    NotepadAPIUtil.createNotepad(newNotepad).then(res => {
        dispatch(receiveNotepad(res.data));
        return res.data;
    })
    .catch(err => dispatch(receiveNotepadErrors(err.response.data?.data || "Log in to create a Notepad")))

export const deleteNotepad = (id : number) => (dispatch : Dispatch) =>
    NotepadAPIUtil.deleteNotepad(id).then(res => dispatch(receiveNotepad(res.data.data)))

export const searchNotepads = (query : string) => (dispatch : Dispatch) =>
    NotepadAPIUtil.searchNotepads(query).then(res => dispatch(receiveNotepads(res.data)))