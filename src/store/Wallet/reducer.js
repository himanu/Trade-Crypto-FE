import { DEPOSIT_MONEY, DEPOSIT_MONEY_FAILURE, DEPOSIT_MONEY_SUCCESS, GET_USER_WALLET, GET_USER_WALLET_FAILURE, GET_USER_WALLET_SUCCESS, GET_WALLET_TXNS, GET_WALLET_TXNS_FAILURE, GET_WALLET_TXNS_SUCCESS, WITHDRAW_MONEY, WITHDRAW_MONEY_FAILURE, WITHDRAW_MONEY_SUCCESS } from "./actionTypes"

const initialState = {
    loading: false,
    error: null,
    wallet: {},
    txns: []
}
export const walletReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_WALLET: 
        case GET_WALLET_TXNS:
        case DEPOSIT_MONEY:
        case WITHDRAW_MONEY:
            return {
                ...state,
                loading: true,
                error: null
            }
        case GET_USER_WALLET_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                wallet: action?.payload ?? {}
            }
        case GET_USER_WALLET_FAILURE:
            return {
                ...state,
                loading: false,
                error: action?.payload
            }
        case GET_WALLET_TXNS_SUCCESS: 
            return {
                ...state,
                loading: false,
                error: null,
                txns: action?.payload ?? []
            }
        case GET_WALLET_TXNS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action?.payload
            }
        case DEPOSIT_MONEY_SUCCESS: 
        case WITHDRAW_MONEY_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                wallet: {
                    ...state?.wallet,
                    balance: action?.payload
                }
            }
        case WITHDRAW_MONEY_FAILURE:
        case DEPOSIT_MONEY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action?.payload,
            }
        default:
            return {...state}
    }
}