import { thunk } from "redux-thunk";
import authReducer from "./Auth/reducer";

import { combineReducers, legacy_createStore, applyMiddleware } from "redux";
import coinReducer from "./Coin/reducer";

const rootReducers = combineReducers({
    auth: authReducer,
    coin: coinReducer
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));