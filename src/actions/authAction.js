import jwt from 'jwt-decode';
import axios from 'axios';
import { IS_AUTHENTICATED, SET_USER_CURRENT } from './types';
import { handleError } from './errorsAction';


export const isAuth = (status) => {
    return {
        type: IS_AUTHENTICATED,
        isAuthenticated: status
    }
}

// get user by token
export const getToken = () => {
    const getUserLocalStorage = localStorage.getItem("token");
    if (getUserLocalStorage) {
        let token = jwt(getUserLocalStorage);
        if (token.exp < Date.now() / 1000) {
            localStorage.removeItem("token");
            window.location.href = "/login";
            return;
        }
        return getUserLocalStorage
    } else {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
    }
}

export const getCurrentUser = decode => {
    return {
        type: SET_USER_CURRENT,
        user: decode
    }
}

