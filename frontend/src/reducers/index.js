import { createStore, combineReducers } from "redux";

import login from "./login";
import signUp from "./signUp";

const reducers = combineReducers({ login, signUp });

const store = createStore(reducers);

export default store;
