import {combineReducers} from 'redux'
import {authReducer} from './reducers/authReducer.js'
import dataReducer from './reducers/dataReducer.js'

export const reducers = combineReducers({
    auth: authReducer,
    data: dataReducer
})

