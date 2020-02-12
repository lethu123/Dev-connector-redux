import axios from 'axios';
import jwt from 'jwt-decode';
import { LOGIN, LOADING, api_login } from './types';
import { isAuth, getCurrentUser } from './authAction';
import { handleError, handleClearError } from './errorsAction';
// const api_login = "http://202.182.100.160:9000/api/users/login";

export const login = (data, history) => dispatch => {
    // response code 200 -> 300
    // dispatch(isLoading(true));
    dispatch(handleClearError());
    axios.post(api_login, data)
        .then(res => {

            // dispatch(isLoading(false));
            localStorage.setItem("token", res.data.token);
            dispatch(getCurrentUser(jwt(res.data.token)));
            history.push('/dashboard');
            dispatch(isAuth(true))
        }).catch(err => {
            dispatch(handleError(err.response.data));
            // dispatch(isLoading(false));
        });

}

export const logout = () => dispatch => {
    localStorage.removeItem("token");
    dispatch(isAuth(false));
    window.location.href = "/login";
}