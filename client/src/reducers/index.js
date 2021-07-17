import { createStore, combineReducers } from "redux";

import login from "./login";
import signUp from "./signUp";
import imgUploader from "./imgUploader";
import photo from "./photoAlbum";
import id from "./userID";
import emoji from "./emoji";

const reducers = combineReducers({ login, signUp, imgUploader,photo,id,emoji});

const store = createStore(reducers);

export default store;
