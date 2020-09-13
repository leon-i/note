import { createStore, applyMiddleware, Action, ActionCreator } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import logger from 'redux-logger';
import { rootReducer, RootState } from '../reducers/root_reducer';

export type NoteThunk = ActionCreator<ThunkAction<undefined, RootState, void, Action<any>>>

const configureStore = (preloadedState? : {}) => {
  let middleware = [thunk, logger];
  if (process.env.NODE_ENV === 'production'){
    middleware = [thunk];
  }
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middleware)
  );
};

export default configureStore;