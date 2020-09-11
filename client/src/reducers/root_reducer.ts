import { combineReducers } from 'redux';
import sessionReducer from './session_reducer';
import entitiesReducer from './entities/entities_reducer';
import errorsReducer from './errors/errors_reducer';

export const rootReducer =  combineReducers({
    session: sessionReducer,
    entities: entitiesReducer,
    errors: errorsReducer
});

export type RootState = ReturnType<typeof rootReducer>
export type SessionState = ReturnType<typeof sessionReducer>
export type ErrorState = ReturnType<typeof errorsReducer>