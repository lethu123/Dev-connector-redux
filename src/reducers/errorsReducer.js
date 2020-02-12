import { CLEAR_ERRORS, GET_ERRORS } from '../actions/types';

const initialState = {}
const errorsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLEAR_ERRORS: {
            return {}
        }
        case GET_ERRORS: {
            return action.error
        }
        default: return state;
    }
}

export default errorsReducer;