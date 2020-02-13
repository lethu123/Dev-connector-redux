import axios from 'axios';
import jwt from 'jwt-decode';
import { api_login } from './types';
import { isAuth, getCurrentUser } from './authAction';
import { handleError, handleClearError } from './errorsAction';

export const login = (data, history) => dispatch => {
    // response code 200 -> 300
    dispatch(handleClearError());
    axios.post(api_login, data)
        .then(res => {
            localStorage.setItem("token", res.data.token);
            dispatch(getCurrentUser(jwt(res.data.token)));
            history.push('/dashboard');
            dispatch(isAuth(true))
        }).catch(err => {
            dispatch(handleError(err.response.data));
        });

}

export const logout = () => dispatch => {
    localStorage.removeItem("token");
    dispatch(isAuth(false));
    window.location.href = "/login";
}