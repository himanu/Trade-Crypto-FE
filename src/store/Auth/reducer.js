const { act } = require("react");
const { REGISTER, REGISTER_FAILURE, REGISTER_SUCCESS, LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS, GET_USER, GET_USER_FAILURE, GET_USER_SUCCESS } = require("./actionTypes");

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
                error: action.payload
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
                user: action.payload
            })
        case GET_USER_SUCCESS:
            return ({
                ...state,
                loading: false,
                error: null,
                user: action.payload
            })
        default:
            return state;
    }
}

export default authReducer;