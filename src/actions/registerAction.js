import axios from 'axios';
import { REGISTER, LOADING, api_register } from './types';
import { handleError, handleClearError } from './errorsAction';

export const register = (data, history) => {
    return dispatch => {
        dispatch(handleClearError());
        axios.post(api_register, data).then(res => {
            dispatch({
                type: REGISTER,
                res_api: res.data
            })
            history.push('/login')
        }).catch(err => {
            dispatch(handleError(err.response.data));
        });

    }
}