import { AUTH_FAILED, AUTH_SUCCESS, USER_LOGGED_OUT} from "../actions/types";

const initialState = {
    isAuth: false,
    profile: {},
    error: null
};

const auth_reducer = (state = initialState, action) => {
    switch (action.type){
        case AUTH_SUCCESS:
            return { profile: JSON.parse(action.payload), isAuth: true, error: null};
        case AUTH_FAILED:
            return { ...state, isAuth: false, error: action.payload};
        case USER_LOGGED_OUT:
            return { ...state, isAuth: false, profile: {}};
        default:
            return state;
    }
};
export default auth_reducer;