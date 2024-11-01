import axios from "axios"
import { GET_USER, GET_USER_FAILURE, GET_USER_SUCCESS, LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, REGISTER, REGISTER_FAILURE, REGISTER_SUCCESS } from "./actionTypes";
import { baseUrl, jwtTokenStr } from "@/constants";
import { toast } from "react-toastify";
import { logout } from "@/lib/utils";


export const register = (userData, navigate) => async (dispatch) => {
    dispatch({
        type: REGISTER
    })
    try {
        const response = await axios.post(`${baseUrl}/signup`, userData);
        const user = response.data;
        dispatch({type: REGISTER_SUCCESS, payload: user});
        toast.success("Signed Up Successfully!");
        navigate("/auth/login")
    } catch(error) {
        dispatch({type: REGISTER_FAILURE, payload: error.message});
        toast.error(error?.response?.data ?? error?.message ?? "Something Went Wrong!");
    }
}



export const login = (userData, setOtpScreen) => async (dispatch) => {
    dispatch({
        type: LOGIN
    })
    try {
        const response = await axios.post(`${baseUrl}/login`, userData);
        const user = response.data;
        if (user?.is2FAEnabled) {
            setOtpScreen(true);
            dispatch({type: LOGIN_SUCCESS, payload: {}});
            return;
        }
        dispatch({type: LOGIN_SUCCESS, payload: user});
        localStorage.setItem("token", user?.token)
    } catch(error) {
        dispatch({type: LOGIN_FAILURE, payload: error.message});
    }
}

export const getUser = (jwt, navigate) => async (dispatch) => {
    dispatch({
        type: GET_USER
    })
    try {
        const response = await axios.get(`${baseUrl}/get_user`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        const user = response.data;
        dispatch({type: GET_USER_SUCCESS, payload: user});
    } catch(error) {
        dispatch({type: GET_USER_FAILURE, payload: error.message});
        
        if (error.status === 401) {
            logout(navigate, dispatch);
        }
    }
}

export const logoutUser = (navigate) => async (dispatch) => {
    dispatch({
        type: LOGOUT,
        payload: {}
    })
    logout(navigate, dispatch);
}