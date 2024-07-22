import {combineReducers} from 'redux'
import {authReducer} from './reducers/authReducer.js'

export const reducers = combineReducers({
    auth: authReducer
})

