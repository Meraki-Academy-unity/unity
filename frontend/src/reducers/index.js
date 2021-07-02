import { createStore, combineReducers } from "redux";

import login from "./login";
import signUp from "./signUp";
import imgUploader from "./imgUploader";
import photo from "./photoAlbum";

const reducers = combineReducers({ login, signUp, imgUploader,photo });

const store = createStore(reducers);

export default store;
