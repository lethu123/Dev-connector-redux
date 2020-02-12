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
    try {
        if (getUserLocalStorage) {
            let token = jwt(getUserLocalStorage);
            if (token.exp < Date.now() / 1000) {
                localStorage.removeItem("token");
                return "not token";
            }
            return getUserLocalStorage;
        }
    } catch (err) {
        localStorage.removeItem("token");
        return "not token";
    }
}

export const getCurrentUser = decode => {
    return {
        type: SET_USER_CURRENT,
        user: decode
    }
}

