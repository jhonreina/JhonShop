import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productsReducer, productsDetailsReducer } from './reducer/productsReducer';
import { authReducer, forgotPasswordReducer, userReducer } from './reducer/userReducer';


const reducer = combineReducers({
    products: productsReducer,  
    productDetails: productsDetailsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer
})

let initialState = {}

const middleware = [thunk]

const store = createStore (reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store