import { LOADING, CLEAR_ERRORS, GET_ERRORS } from '../actions/types';

const initialState = {
    isLoading: false
}
const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING: {
            return {
                isLoading: action.isLoading
            }
        }
        default: return state;
    }
}

export default loadingReducer;