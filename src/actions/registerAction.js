import axios from 'axios';
import { REGISTER, LOADING, api_register } from './types';
import { handleError, handleClearError } from './errorsAction';
// const api_register = "http://202.182.100.160:9000/api/users/register";

export const register = (data, history) => {
    return dispatch => {
        // dispatch(isLoading);
        dispatch(handleClearError());
        axios.post(api_register, data).then(res => {
            dispatch({
                type: REGISTER,
                res_api: res.data,
                // isLoading: false
            })
            history.push('/login')
        }).catch(err => {
            dispatch(handleError(err.response.data));
        });

    }
}