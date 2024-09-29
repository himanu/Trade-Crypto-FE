import { thunk } from "redux-thunk";
import authReducer from "./Auth/reducer";

import { combineReducers, legacy_createStore, applyMiddleware } from "redux";

const rootReducers = combineReducers({
    auth: authReducer
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));