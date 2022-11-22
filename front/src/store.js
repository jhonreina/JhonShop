import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productsReducer, productsDetailsReducer, newProductReducer, productReducer } from './reducer/productsReducer';
import { authReducer, forgotPasswordReducer, userReducer } from './reducer/userReducer';
import { cartReducer } from './reducer/cartReducer';
import { newOrderReducer } from './reducer/orderReducer';


const reducer = combineReducers({
    products: productsReducer,  
    productDetails: productsDetailsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newProduct: newProductReducer,
    product: productReducer,
    newOrder: newOrderReducer
})

let initialState = {
    cart: {
        cartItems:localStorage.getItem("cartItem") ? JSON.parse(localStorage.getItem("cartItems")):[],
        shippingInfo:localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")):{}
    }
}

const middleware = [thunk]

const store = createStore (reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store