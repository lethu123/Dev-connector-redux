import { IS_AUTHENTICATED, SET_USER_CURRENT } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    currentUser: {}
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_AUTHENTICATED: {
            return {
                ...state,
                isAuthenticated: action.isAuthenticated
            }
        }

        case SET_USER_CURRENT: {
            return {
                ...state,
                currentUser: action.user
            }
        }
        default: return state;
    }
}

export default authReducer;