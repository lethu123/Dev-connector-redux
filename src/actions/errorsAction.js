import { GET_ERRORS, CLEAR_ERRORS } from './types';

export const handleError = (error) => {
    return {
        type: GET_ERRORS,
        error
    }
}
export const handleClearError = () => {
    return {
        type: CLEAR_ERRORS
    }
}

