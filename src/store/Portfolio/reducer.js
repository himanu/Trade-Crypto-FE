
import { FETCH_PORTFOLIO, FETCH_PORTFOLIO_SUCCESS, FETCH_PORTFOLIO_FAILURE } from "./actionTypes";


const initialState = {
    loading: false,
    error: null,
    portfolio: []
}
export const portfolioReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PORTFOLIO: 
            return {
                ...state,
                loading: true,
                error: null
            }
        case FETCH_PORTFOLIO_SUCCESS: 
            return {
                loading: false,
                error: null,
                portfolio: action?.payload ?? []
            };
        case FETCH_PORTFOLIO_FAILURE:
            return {
                loading: false,
                error: action?.payload,
                portfolio: []
            }
        default:
            return {
                ...state
            }
    }

}