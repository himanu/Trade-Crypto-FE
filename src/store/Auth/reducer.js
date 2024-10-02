import { jwtTokenStr } from "@/constants";
import { REGISTER, REGISTER_FAILURE, REGISTER_SUCCESS, LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, GET_USER, GET_USER_FAILURE, GET_USER_SUCCESS } from "./actionTypes";

const initialState = {
    user: null,
    loading: false,
    error: null,
    jwt: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER:
            return ({
                ...state,
                loading: true,
                error: null
            })
        case LOGIN:
            return ({
                ...state,
                loading: true,
                error: null
            })
        case GET_USER:
            return ({
                ...state,
                loading: true,
                error: null
            })
        case REGISTER_FAILURE:
            return ({
                ...state,
                loading: false,
                error: action.payload
            })
        case LOGIN_FAILURE:
            return ({
                ...state,
                loading: false,
                error: action.payload
            })
        case GET_USER_FAILURE:
            return ({
                ...state,
                loading: false,
                error: action.payload,
                user: null,
                jwt: null
            })
        case REGISTER_SUCCESS:
            return ({
                ...state,
                loading: false,
                error: null,
                jwt: null
            })
        case LOGIN_SUCCESS:
            return ({
                ...state,
                loading: false,
                error: null,
                user: null,
                jwt: action?.payload?.token ?? ""
            })
        case GET_USER_SUCCESS:
            return ({
                ...state,
                loading: false,
                error: null,
                user: action.payload,
                jwt: localStorage.getItem(jwtTokenStr)
            })
        case LOGOUT:
            return ({
                ...initialState
            })
        default:
            return state;
    }
}

export default authReducer;