import { FETCH_COIN_LIST_SUCCESS, FETCH_COIN_DETAILS, FETCH_COIN_DETAILS_FAILURE, FETCH_COIN_DETAILS_SUCCESS, FETCH_COIN_LIST, FETCH_COIN_LIST_FAILURE, FETCH_MARKET_CHART, FETCH_MARKET_CHART_FAILURE, FETCH_MARKET_CHART_SUCCESS, FETCH_TOP_50_COINS, FETCH_TOP_50_COINS_FAILURE, FETCH_TOP_50_COINS_SUCCESS, SEARCH_COIN, SEARCH_COIN_FAILURE, SEARCH_COIN_SUCCESS} from "./actionTypes";
const initialState = {
    coins: [],
    top50Coins: [],
    coinMarketData: {data: [], loading: false},
    searchCoinResult: [],
    coinDetail: null,
    loading: true,
    error: null
}

const coinReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COIN_LIST:
            return ({
                ...state,
                loading: true,
                error: null
            })
        case FETCH_COIN_LIST_SUCCESS:
            return ({
                ...state,
                coins: action.payload,
                loading: false,
                error: null
            })

        case FETCH_COIN_LIST_FAILURE:
            return ({
                ...state,
                coins: initialState.coins,
                loading: false,
                error: action.payload
            })
        case FETCH_MARKET_CHART:
            return ({
                ...state,
                loading: true,
                error: null
            })
        case FETCH_MARKET_CHART_SUCCESS:
            return ({
                ...state,
                coinMarketData: { data: action?.payload?.prices ?? [], loading: false},
                loading: false,
                error: null
            })
        case FETCH_MARKET_CHART_FAILURE:
            return ({
                ...state,
                coinMarketData: initialState.coinMarketData,
                loading: false,
                error: null
            })
        case FETCH_TOP_50_COINS:
            return ({
                ...state,
                loading: true,
                error: null,
            })
        case FETCH_TOP_50_COINS_SUCCESS:
            return ({
                ...state,
                loading: false,
                top50Coins: action.payload,
                error: null,
            })
        case FETCH_TOP_50_COINS_FAILURE:
            return ({
                ...state,
                loading: false,
                top50Coins: initialState.top50Coins,
                error: action.payload,
            })
        case FETCH_COIN_DETAILS:
            return ({
                ...state,
                loading: true,
                error: null,
            })

        case FETCH_COIN_DETAILS_SUCCESS:
            return ({
                ...state,
                coinDetail: action?.payload,
                loading: false,
                error: null,
            })
        case FETCH_COIN_DETAILS_FAILURE:
            return ({
                ...state,
                coinDetail: initialState.coinDetail,
                loading: false,
                error: action?.payload,
            })
        case SEARCH_COIN:
            return ({
                ...state,
                loading: true,
                error: null,
            })

        case SEARCH_COIN_SUCCESS:
            return ({
                ...state,
                loading: false,
                searchCoinResult: action.payload,
                error: null,
            })
        case SEARCH_COIN_FAILURE:
            return ({
                ...state,
                loading: false,
                searchCoinResult: initialState.searchCoinResult,
                error: action.payload,
            })
        default:
            return state;
    }
}

export default coinReducer;
