import axios from 'axios';
import { LIST_USER, GET_PROFILE, DETAIL_USER, api_user, api_profile, api_experience, api_education } from './types';
import { isLoading } from './loadingAction';
import { getToken, isAuth } from './authAction';
import { handleError } from './errorsAction';
import { toast } from 'react-toastify';
import { logout } from './loginAction';


// get list user
export const loadUsers = () => {
    return async dispatch => {
        dispatch(isLoading(true))
        const resLoadUser = await axios.get(api_user);
        dispatch({
            type: LIST_USER,
            res_api: resLoadUser.data
        })
        dispatch(isLoading(false))
    }
}

// get profile user
export const getDetailUser = (handle) => {
    const api_handle = `/profile/handle/${handle}`;
    return dispatch => {
        dispatch(isLoading(true));
        axios.get(api_handle).then(res => {
            dispatch({
                type: DETAIL_USER,
                res_api: res.data
            })
            dispatch(isLoading(false));
        });

    }
}

// load profile in dashboard
export const getProfileUser = () => (dispatch) => {
    let token = getToken();
    if (token !== "not token") {
        axios.get(api_profile, { headers: { 'Authorization': token } }).then(res => {

            dispatch({
                type: GET_PROFILE,
                profile: res.data
            })
            dispatch(isLoading(false))
        }).catch(err => {
            dispatch(handleError(err.response.data));
            dispatch(isLoading(false))
            dispatch({
                type: GET_PROFILE,
                profile: null
            })

        })
        // dispatch(isLoading(false))
    }
}
export const clearProfile = () => dispatch => {
    dispatch({
        type: GET_PROFILE,
        profile: null
    })
}

export const createProfile = data => dispatch => {
    let token = getToken();
    axios.post(api_profile, data, { headers: { 'Authorization': token } })
        .then(res => {
            console.log("res", res.data);
            dispatch({
                type: GET_PROFILE,
                profile: res.data
            })
        })
        .catch(err => {
            console.log("err", err.response.data);
        })
}

// add experience 
export const addExperience = (data) => dispatch => {
    let token = getToken();
    axios.post(api_experience, data, { headers: { 'Authorization': token } })
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                profile: res.data
            })
        })
        .catch(err => {
            console.log("err", err.response.data);
        })
}
// delete experience
export const deleteEXP = id => dispatch => {
    const api_deleteExp = `/profile/experience/${id}`;
    let token = getToken();
    if (token !== "not token") {
        axios.delete(api_deleteExp, { headers: { 'Authorization': token } }).then(res => {
            // dispatch(handleClearError());
            dispatch(getProfileUser());
            toast.success("Delete successfully!", {
                position: toast.POSITION.TOP_RIGHT
            });
        }).catch(error => {

            // dispatch(handleError(error.response.data));
            toast.error(error.response.data.experiencenotfound, {
                position: toast.POSITION.TOP_RIGHT
            });
        })
    }
}

// add education 
export const addEducation = (data) => dispatch => {
    let token = getToken();
    axios.post(api_education, data, { headers: { 'Authorization': token } })
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                profile: res.data
            })
        })
        .catch(err => {
            console.log("err", err.response.data);
        })
}

// delete education
export const deleteEDU = id => dispatch => {
    const api_deleteEdu = `/profile/education/${id}`;
    let token = getToken();
    if (token !== "not token") {
        axios.delete(api_deleteEdu, { headers: { 'Authorization': token } }).then(res => {
            // dispatch(handleClearError());
            dispatch(getProfileUser());
            toast.success("Delete successfully!", {
                position: toast.POSITION.TOP_RIGHT
            });
        }).catch(error => {

            // dispatch(handleError(error.response.data));
            toast.error(error.response.data.educationnotfound, {
                position: toast.POSITION.TOP_RIGHT
            });
        })
    }
}

// delete account
export const deleteAccount = () => dispatch => {
    let token = getToken();
    axios.delete(api_profile, { headers: { 'Authorization': token } }).then(res => {
        toast.success("Delete successfully!", {
            position: toast.POSITION.TOP_RIGHT
        });
        dispatch(logout());
    }).catch(error => {
        console.log("erroe", error.response.data);
    })
}