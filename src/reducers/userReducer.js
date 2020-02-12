import { LIST_USER, DETAIL_USER, GET_PROFILE } from '../actions/types';

const initialState = {
    users: [],
    user: null,
    profile: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIST_USER: {
            return {
                ...state,
                users: action.res_api
            }
        }
        case DETAIL_USER: {
            return {
                ...state,
                user: action.res_api
            }
        }
        case GET_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }


        default: return state
    }
}

export default userReducer;