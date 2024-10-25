import axios from "axios";
import { FETCH_PORTFOLIO, FETCH_PORTFOLIO_FAILURE, FETCH_PORTFOLIO_SUCCESS } from "./actionTypes"
import { baseUrl } from "@/constants";

export const fetchPortfolio = (jwt) => async (dispatch) => {
    try {
        dispatch({
            type: FETCH_PORTFOLIO
        });

        const response = await axios.get(`${baseUrl}/portfolio`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch({
            type: FETCH_PORTFOLIO_SUCCESS,
            payload: response?.data
        })
    } catch (err) {
        dispatch({
            type: FETCH_PORTFOLIO_FAILURE,
            payload: err?.message ?? ""
        })
    }
}