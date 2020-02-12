import { GET_POSTS, GET_POST } from '../actions/types';

const initialState = {
    data: [],
    post: null
}

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS: {
            return { ...state, data: action.res_api };
        }
        case GET_POST: {
            return { ...state, post: action.post }
        }

        default: return state;
    }
}

export default postsReducer;