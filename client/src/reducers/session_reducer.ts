import { RECEIVE_USER, LOGOUT_USER, UserActionTypes } from '../actions/user_actions';

interface AuthState {
    isAuthenticated: boolean;
    currentUserId: number | null;
}

const initialState : AuthState = {
    isAuthenticated: false,
    currentUserId: null
}

export default (state = initialState, action : UserActionTypes) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_USER:
            return Object.assign({}, state, { isAuthenticated: true, currentUserId: action.payload.user_id });
        case LOGOUT_USER:
            return initialState;
        default:
            return state;
    }
};