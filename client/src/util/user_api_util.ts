import axios from 'axios';
import { NewUser, LoginInput } from '../interfaces';

export const register = (data : NewUser) => (
    axios.post('/api/users/register', data)
)

export const login = (data : LoginInput) => (
    axios.post('/api/users/login', data)
)

export const setAuthToken = (token : string | boolean) => {
    token ? axios.defaults.headers.common['Authorization'] = `Bearer ${token}` : delete axios.defaults.headers.common['Authorization'];
}