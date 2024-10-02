import axios from "axios"
import { GET_USER_WALLET, GET_USER_WALLET_FAILURE, GET_USER_WALLET_SUCCESS, GET_WALLET_TXNS, GET_WALLET_TXNS_FAILURE, GET_WALLET_TXNS_SUCCESS } from "./actionTypes"
import { baseUrl } from "@/constants"

export const getUserWallet = (jwt) => async (dispatch) => {
    dispatch({
        type: GET_USER_WALLET
    })
    try {
        const resposne = await axios.get(`${baseUrl}/wallet`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        const wallet = resposne?.data;
        dispatch({
            type: GET_USER_WALLET_SUCCESS,
            payload: wallet
        })
    } catch(err) {
        dispatch({
            type: GET_USER_WALLET_FAILURE,
            payload: err.message
        })
    }
}

export const getWalletTxns = (jwt) => async (dispatch) => {
    dispatch({
        type: GET_WALLET_TXNS
    })
    try {
        const resposne = await axios.get(`${baseUrl}/wallet/txns`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        const txns = resposne?.data;
        dispatch({
            type: GET_WALLET_TXNS_SUCCESS,
            payload: txns
        })
    } catch(err) {
        dispatch({
            type: GET_WALLET_TXNS_FAILURE,
            payload: err.message
        })
    }
}

export const depositMoney = (jwt) => async (dispatch) => {
    
}