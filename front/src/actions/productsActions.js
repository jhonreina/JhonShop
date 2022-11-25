import axios from 'axios'

import {
    ADMIN_PRODUCTS_FAIL,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAILED, ALL_PRODUCTS_REQUEST, ALL_PRODUCTS_SUCCESS, CLEAR_ERRORS,DELATE_PRODUCT_FAIL,DELATE_PRODUCT_REQUEST,DELATE_PRODUCT_SUCCESS,DELETE_REVIEW_FAIL,DELETE_REVIEW_REQUEST,DELETE_REVIEW_SUCCESS,GET_REVIEWS_FAIL,GET_REVIEWS_REQUEST,GET_REVIEWS_SUCCESS,NEW_PRODUCT_FAIL,NEW_PRODUCT_REQUEST,NEW_PRODUCT_SUCCESS,NEW_REVIEW_FAIL,NEW_REVIEW_REQUEST,NEW_REVIEW_SUCCESS,PRODUCT_DETAILS_FAILED, PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS
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

//ELIMINAR UN PRODUCTO (ADMIN)
export const delateProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELATE_PRODUCT_REQUEST })
        const { data } = await axios.delete(`api/producto/${id}`)

        dispatch({
            type: DELATE_PRODUCT_SUCCESS,
            payload:data.success
        })
    } catch (error) {
        dispatch({
            type: DELATE_PRODUCT_FAIL,
            payload:error.response.data.message
        })
    }
}

//editar producto (admin)
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/producto/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
//registar una review
export const newReview = (reviewData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_REVIEW_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/review`, reviewData, config)

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getProductReviews = (id) => async (dispatch) => {
    try {

        dispatch({ type: GET_REVIEWS_REQUEST })

        const { data } = await axios.get(`/api/reviews?id=${id}`)

        dispatch({
            type: GET_REVIEWS_SUCCESS,
            payload: data.opiniones
        })

    } catch (error) {

        dispatch({
            type: GET_REVIEWS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete product review
export const deleteReview = (id, productId) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_REVIEW_REQUEST })

        const { data } = await axios.delete(`/api/reviews?idProducto=${productId}&idReview=${id}`)

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {

        console.log(error.response);

        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}
// clear error

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type:CLEAR_ERRORS
    })
}
