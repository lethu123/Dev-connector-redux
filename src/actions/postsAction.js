import axios from 'axios';
import { api_posts, GET_POSTS, GET_POST } from './types';
import { isLoading } from './loadingAction';
import { getToken } from './authAction';
import { handleError, handleClearError } from './errorsAction';
import { toast } from 'react-toastify';


// get list posts
export const loadPosts = () => async dispatch => {
    getToken();
    const resLoadPosts = await axios.get(api_posts);
    dispatch({
        type: GET_POSTS,
        res_api: resLoadPosts.data
    })
    dispatch(isLoading(false))

}

// post 
export const postFeed = data => dispatch => {
    let token = getToken();
    if (token) {
        axios.post(api_posts, data, { headers: { 'Authorization': token } })
            .then(res => {
                dispatch(handleClearError());
                dispatch(loadPosts());
                toast.success("Post feed successfully!", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }).catch(error => {
                dispatch(handleError(error.response.data))
            })
    }
}

// delete post
export const deleteFeed = id => dispatch => {
    const api_deletePost = `/posts/${id}`;
    let token = getToken();
    if (token) {
        axios.delete(api_deletePost, { headers: { 'Authorization': token } }).then(res => {
            dispatch(handleClearError());
            dispatch(loadPosts());
            toast.success("Delete successfully!", {
                position: toast.POSITION.TOP_RIGHT
            });
        }).catch(error => {
            toast.error(error.response.data.postnotfound, {
                position: toast.POSITION.TOP_RIGHT
            });
        })
    }
}

//like post
export const likeFeed = id => dispatch => {
    let api_like = `/posts/like/${id}`;
    let token = getToken();
    if (token) {
        axios.post(api_like, '', { headers: { 'Authorization': token } }).then(res => {
            dispatch(handleClearError());
            dispatch(loadPosts());
            toast.success(res.data, {
                position: toast.POSITION.TOP_RIGHT
            });
        }).catch(error => {
            toast.error(error.response.data.alreadyliked, {
                position: toast.POSITION.TOP_RIGHT
            });
        })
    }
}

//unlike post
export const unlikeFeed = id => dispatch => {
    let api_unlike = `/posts/unlike/${id}`;
    let token = getToken();
    if (token) {
        axios.post(api_unlike, '', { headers: { 'Authorization': token } }).then(res => {
            dispatch(handleClearError());
            dispatch(loadPosts());
            toast.success("Liked!", {
                position: toast.POSITION.TOP_RIGHT
            });
        }).catch(error => {
            toast.error(error.response.data.notliked, {
                position: toast.POSITION.TOP_RIGHT
            });
        })
    }
}

// get comment
export const loadComments = id => dispatch => {
    let api_comments = `/posts/${id}`;
    let token = getToken();
    if (token) {
        axios.get(api_comments, { headers: { 'Authorization': token } })
            .then(res => {
                dispatch({
                    type: GET_POST,
                    post: res.data
                });
                dispatch(isLoading(false));
            }).catch(error => {
                dispatch(handleError(error.response.data))
            })
    }
}

//reply comment
export const replyComment = (data, id) => dispatch => {
    let token = getToken();
    let api_post_comment = `/posts/comment/${id}`;
    if (token) {
        axios.post(api_post_comment, data, { headers: { 'Authorization': token } })
            .then(res => {
                dispatch(handleClearError());
                dispatch(loadComments(id));
                toast.success("Post feed successfully!", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }).catch(error => {
                dispatch(handleError(error.response.data))
            })
    }
}

// delete comment
export const deleteComment = (idPost, idComment) => dispatch => {
    const api_delete_comment = `/posts/comment/${idPost}/${idComment}`;
    let token = getToken();
    if (token) {
        axios.delete(api_delete_comment, { headers: { 'Authorization': token } }).then(res => {
            dispatch(handleClearError());
            dispatch(loadComments(idPost));
            toast.success("Delete successfully!", {
                position: toast.POSITION.TOP_RIGHT
            });
        }).catch(error => {

            dispatch(handleError(error.response.data));
            toast.error(error.response.data.commentnotexists, {
                position: toast.POSITION.TOP_RIGHT
            });
        })
    }
}