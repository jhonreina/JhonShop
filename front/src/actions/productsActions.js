import axios from 'axios'

import {
    ADMIN_PRODUCTS_FAIL,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAILED, ALL_PRODUCTS_REQUEST, ALL_PRODUCTS_SUCCESS, CLEAR_ERRORS,NEW_PRODUCT_FAIL,NEW_PRODUCT_REQUEST,NEW_PRODUCT_SUCCESS,PRODUCT_DETAILS_FAILED, PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS
} from '../constants/productConstans'

export const getProducts = (currentPage=1, keyword='', precio) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCTS_REQUEST })
        
        let link = `/api/productos?keyword=${keyword}&page=${currentPage}&precio[gte]=${precio[0]}&precio[lte]=${precio[1]}`

        const { data } = await axios.get(link)



        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAILED,
            payload:error.response.data.message
        })
    }
}

//ADMIN
export const getAdminProducts = () =>async(dispatch)=> {
    try {
        dispatch({ type: ADMIN_PRODUCTS_REQUEST })
        
        const { data } = await axios.get('/api/admin/productos')
        
        dispatch({
            type: ADMIN_PRODUCTS_SUCCESS,
            payload:data.products
        })
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
    
}

//NUEVO PRODUCTO-ADMIN
export const newProduct = (productData) => async (dispatch) => {
    try {
        dispatch({type: NEW_PRODUCT_REQUEST})
        const config = {
            header: {'Content-Type': 'application/json'}
        }
        
        const { data } = await axios.post('/api/producto/nuevo',productData, config)
        
        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

// ver datalle del producto 
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/producto/${id}`)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAILED,
            payload:error.response.data.message
        })
    }
}

// clear error

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type:CLEAR_ERRORS
    })
}
