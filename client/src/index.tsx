import React from 'react';
import ReactDOM from 'react-dom';
import jwt_decode from 'jwt-decode';
import Root from './components/root';
import configureStore from './store/store';
import { setAuthToken } from './util/user_api_util';
import { logout } from './actions/user_actions';
import { User } from './interfaces';
import * as serviceWorker from './serviceWorker';
import './styles/index.scss';
import './index.css';

document.addEventListener('DOMContentLoaded', () => {
  let store;
  const token = localStorage.jwtToken;

  if (token) {
    setAuthToken(token);
    const decodedUser : User = jwt_decode(token);
    const preloadedState = { session: { isAuthenticated: true, currentUserId: decodedUser.user_id }, 
    entities: { users: { [decodedUser.user_id]: decodedUser } } };

    store = configureStore(preloadedState);

    const currentTime = Date.now() / 1000;
    if (decodedUser.exp && (decodedUser.exp < currentTime)) {
      store.dispatch<any>(logout());
    }
  } else {
    store = configureStore({});
  }
  

  ReactDOM.render(
    <React.StrictMode>
      <Root store={store} />
    </React.StrictMode>,
    document.getElementById('root')
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
