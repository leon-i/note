import { RECEIVE_FAVORITES,
RECEIVE_FAVORITE,
REMOVE_FAVORITE,
FavoriteActionTypes} from "../../actions/favorite_actions";
import {LOGOUT_USER, LogoutCurrentUserAction} from "../../actions/user_actions";
import {Notepad} from "../../interfaces";

const convertToObject = (favorites : Notepad[]) => {
    const result : State = {};
    favorites.forEach(favorite => result[favorite.ID] = favorite);
    return result;
}

interface State {
    [key: number]: Notepad
}

export default (state : State={}, action : FavoriteActionTypes | LogoutCurrentUserAction) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_FAVORITES:
            return convertToObject(action.payload);
        case RECEIVE_FAVORITE:
            return Object.assign({}, state, { [action.payload.ID]: action.payload });
        case REMOVE_FAVORITE:
            const currentState = Object.assign({}, state);
            delete currentState[action.payload.ID];
            return currentState;
        case LOGOUT_USER:
            return [];
        default:
            return state;
    }
}