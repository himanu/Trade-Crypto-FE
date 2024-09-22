import { thunk } from "redux-thunk";
import authReducer from "./Auth/reducer";

const { combineReducers, legacy_createStore, applyMiddleware } = require("redux");

const rootReducers = combineReducers({
    auth: authReducer
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));