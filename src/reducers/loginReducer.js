import { LOGIN } from '../actions/types';
const initialState = {
    data: {}

}
const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                data: action.res_api
            }
        }
        default: return state
    }
}
export default loginReducer;