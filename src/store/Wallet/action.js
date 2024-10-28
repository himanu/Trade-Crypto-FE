import axios from "axios"
import { DEPOSIT_MONEY, DEPOSIT_MONEY_FAILURE, DEPOSIT_MONEY_SUCCESS, GET_USER_WALLET, GET_USER_WALLET_FAILURE, GET_USER_WALLET_SUCCESS, GET_WALLET_TXNS, GET_WALLET_TXNS_FAILURE, GET_WALLET_TXNS_SUCCESS, WITHDRAW_MONEY, WITHDRAW_MONEY_FAILURE, WITHDRAW_MONEY_SUCCESS } from "./actionTypes"
import { baseUrl } from "@/constants"
import { logout } from "@/lib/utils"
import { toast } from "react-toastify"

export const getUserWallet = (jwt, navigate) => async (dispatch) => {
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
        if (err?.status === 401)
            logout(navigate, dispatch);
    }
}

export const getWalletTxns = (jwt, navigate) => async (dispatch) => {
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
        if (err?.status === 401)
            logout(navigate, dispatch);
    }
}

export const markDepositTxnSuccessful = (data, jwt, navigate, fetchWalletTxn) => async (dispatch) => {
    try {
        dispatch({
            type: DEPOSIT_MONEY
        })

        const resposne = await axios.post(`${baseUrl}/wallet/deposit/verify`, data, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });

        dispatch({
            type: DEPOSIT_MONEY_SUCCESS,
            payload: resposne?.data?.amount
        })
        fetchWalletTxn();
        toast.success("Successfully Added funds")

    } catch (err) {
        dispatch({
            type: DEPOSIT_MONEY_FAILURE,
            payload: err.message
        })
        toast.error("Something Went Wrong!");
        if (err?.status === 401)
            logout(navigate, dispatch);
    }
    
}

export const withdrawMoney = (amount, jwt, navigate, callback) => async (dispatch) => {
    try {
        dispatch({
            type: WITHDRAW_MONEY
        })
        const response = await axios.post(`${baseUrl}/wallet/withdraw?amount=${amount}`, null, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        dispatch({
            type: WITHDRAW_MONEY_SUCCESS,
            payload: response?.data?.balance
        })
        callback();
        toast.success("Successfully processed your withdrawal request")
    } catch (err) {
        dispatch({
            type: WITHDRAW_MONEY_FAILURE,
            payload: err.message
        })
       
        if (err?.status === 401)
            return logout(navigate, dispatch);
        toast.error("Something went wrong!")
    }
}