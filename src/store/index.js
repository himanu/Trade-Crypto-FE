import { thunk } from "redux-thunk";
import authReducer from "./Auth/reducer";

import { combineReducers, legacy_createStore, applyMiddleware } from "redux";
import coinReducer from "./Coin/reducer";
import { walletReducer } from "./Wallet/reducer";

const rootReducers = combineReducers({
    auth: authReducer,
    coin: coinReducer,
    wallet: walletReducer
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));