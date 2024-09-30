import axios from "axios"
import { FETCH_COIN_DETAILS, FETCH_COIN_DETAILS_FAILURE, FETCH_COIN_DETAILS_SUCCESS, FETCH_COIN_LIST, FETCH_COIN_LIST_FAILURE, FETCH_COIN_LIST_SUCCESS, FETCH_MARKET_CHART, FETCH_MARKET_CHART_FAILURE, FETCH_MARKET_CHART_SUCCESS, FETCH_TOP_50_COINS, FETCH_TOP_50_COINS_FAILURE, FETCH_TOP_50_COINS_SUCCESS, SEARCH_COIN, SEARCH_COIN_FAILURE, SEARCH_COIN_SUCCESS} from "./actionTypes";
import { baseUrl } from "@/constants";
import { toast } from "react-toastify";


export const getCoinList = (page, jwt) => async (dispatch) => {
    dispatch({
        type: FETCH_COIN_LIST
    })
    try {
        const response = await axios.get(`${baseUrl}/coin/list?page=${page}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        const coins = response.data;
        console.log(coins);
        dispatch({type: FETCH_COIN_LIST_SUCCESS, payload: coins});
    } catch(error) {
        dispatch({type: FETCH_COIN_LIST_FAILURE, payload: error.message});
        console.log("Error ", error);
    }
}

export const getCoinMarketData = (coin, days, jwt) => async (dispatch) => {
    dispatch({
        type: FETCH_MARKET_CHART
    })
    try {
        const response = await axios.get(`${baseUrl}/coin/market/chart?days=${days}&coinId=${coin}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        const marketData = response.data;
        console.log(marketData);
        dispatch({type: FETCH_MARKET_CHART_SUCCESS, payload: marketData});
    } catch(error) {
        dispatch({type: FETCH_MARKET_CHART_FAILURE, payload: error.message});
        console.log("Error ", error);
    }
}

export const getTop50Coins = (jwt) => async (dispatch) => {
    dispatch({
        type: FETCH_TOP_50_COINS
    })
    try {
        const response = await axios.get(`${baseUrl}/coin/top50`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        const coins = response.data;
        console.log(coins);
        dispatch({type: FETCH_TOP_50_COINS_SUCCESS, payload: coins});
    } catch(error) {
        dispatch({type: FETCH_TOP_50_COINS_FAILURE, payload: error.message});
        console.log("Error ", error);
    }
}

export const getCoinDetails = (coin, jwt) => async (dispatch) => {
    dispatch({
        type: FETCH_COIN_DETAILS
    })
    try {
        const response = await axios.get(`${baseUrl}/coin/detail?coinId=${coin}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        const coinData = response.data;
        console.log(coinData);
        dispatch({type: FETCH_COIN_DETAILS_SUCCESS, payload: coinData});
    } catch(error) {
        dispatch({type: FETCH_COIN_DETAILS_FAILURE, payload: error.message});
        console.log("Error ", error);
    }
}

export const searchCoins = (query, jwt) => async (disaptch) => {
    disaptch({
        type: SEARCH_COIN
    })
    try {
        const response = await axios.get(`${baseUrl}/coin/search?query=${query}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        disaptch({
            type: SEARCH_COIN_SUCCESS,
            payload: response?.data
        });
    } catch(err) {
        disaptch({
            type: SEARCH_COIN_FAILURE,
            payload: err.message
        })
    }
}