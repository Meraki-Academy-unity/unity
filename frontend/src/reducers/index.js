import {createStore, combineReducers} from 'redux'

import login from './login'

const reducers = combineReducers({login})

const store= createStore(reducers)

export default store