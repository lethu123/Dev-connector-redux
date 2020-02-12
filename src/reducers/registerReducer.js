import { LOADING, REGISTER } from '../actions/types';
const initialState = {
    data: "",
    isLoading: false
}

const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return {
                isLoading: action.isLoading
            }
        case REGISTER:
            return {
                data: action.res_api,
                isLoading: action.isLoading
            }

        default: return state;
    }
}

export default registerReducer;