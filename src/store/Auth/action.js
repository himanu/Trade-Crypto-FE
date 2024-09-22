import axios from "axios"
import { GET_USER, GET_USER_FAILURE, GET_USER_SUCCESS, LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS, REGISTER, REGISTER_FAILURE, REGISTER_SUCCESS } from "./actionTypes";

const baseUrl = "http://localhost:5454";
export const register = (userData) => async (dispatch) => {
    dispatch({
        type: REGISTER
    })
    try {
        const response = await axios.post(`${baseUrl}/signup`, userData);
        const user = response.data;
        console.log(user);
        dispatch({type: REGISTER_SUCCESS, payload: user});
    } catch(error) {
        dispatch({type: REGISTER_FAILURE, payload: error.message});
        console.log("Error ", error);
    }
}



export const login = (userData) => async (dispatch) => {
    dispatch({
        type: LOGIN
    })
    try {
        const response = await axios.post(`${baseUrl}/login`, userData);
        const user = response.data;
        console.log(user);
        dispatch({type: LOGIN_SUCCESS, payload: user});
    } catch(error) {
        dispatch({type: LOGIN_FAILURE, payload: error.message});
        console.log("Error ", error);
    }
}

export const getUser = (jwt) => async (dispatch) => {
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
        console.log(user);
        dispatch({type: GET_USER_SUCCESS, payload: user});
    } catch(error) {
        dispatch({type: GET_USER_FAILURE, payload: error.message});
        console.log("Error ", error);
    }
}