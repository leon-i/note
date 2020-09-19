import * as FavoriteAPIUtil from '../util/favorite_api_util';
import {NewFavorite, Notepad} from "../interfaces";
import {Dispatch} from "redux";

export const RECEIVE_FAVORITES = 'RECEIVE_FAVORITES';
export const RECEIVE_FAVORITE = 'RECEIVE_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

interface ReceiveFavoritesAction {
    type: typeof RECEIVE_FAVORITES,
    payload: Notepad[]
}

interface ReceiveFavoriteAction {
    type: typeof RECEIVE_FAVORITE,
    payload: Notepad
}

interface RemoveFavoriteAction {
    type: typeof REMOVE_FAVORITE,
    payload: Notepad
}

export type FavoriteActionTypes = ReceiveFavoritesAction | ReceiveFavoriteAction | RemoveFavoriteAction;

const receiveFavorites = (payload : Notepad[]) : FavoriteActionTypes => ({
    type: RECEIVE_FAVORITES,
    payload
});

const receiveFavorite = (payload : Notepad) : FavoriteActionTypes => ({
    type: RECEIVE_FAVORITE,
    payload
});

const removeFavorite = (payload : Notepad) => ({
    type: REMOVE_FAVORITE,
    payload
});

export const getFavorites : any = (userId : number) => (dispatch : Dispatch) =>
    FavoriteAPIUtil.getFavorites(userId).then(res => dispatch(receiveFavorites(res.data || [])))

export const createFavorite : any = (newFavorite : NewFavorite) => (dispatch : Dispatch) =>
    FavoriteAPIUtil.createFavorite(newFavorite).then(res => dispatch(receiveFavorite(res.data)))

export const deleteFavorite : any = (fav : NewFavorite) => (dispatch : Dispatch) =>
    FavoriteAPIUtil.deleteFavorite(fav).then(res => dispatch(removeFavorite(res.data)))