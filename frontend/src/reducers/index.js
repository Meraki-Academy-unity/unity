import { createStore, combineReducers } from "redux";

import login from "./login";
import signUp from "./signUp";
import imgUploader from "./imgUploader";

const reducers = combineReducers({ login, signUp, imgUploader });

const store = createStore(reducers);

export default store;
