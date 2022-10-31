import { ALL_PRODUCTS_FAILED, ALL_PRODUCTS_SUCCESS, ALL_PRODUCTS_REQUEST, CLEAR_ERRORS,PRODUCT_DETAILS_FAILED,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_REQUEST } from "../constants/productConstans";


export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type){
        case ALL_PRODUCTS_REQUEST:
            return {
                loading: true,
                productos:[]

            }
        
        case ALL_PRODUCTS_SUCCESS:
            return {
                loading:false,
                productos:action.payload.productos,
                cantidad:action.payload.cantidad
            }  
        
        case ALL_PRODUCTS_FAILED: 
            return {
                loading: false,
                error:action.payload
            }
        
            
            
        case CLEAR_ERRORS: 
            return {
                ...state,
                error:null
            }
        
            
    
        default:
            return state;
          
    }
}

// DETALLES DE PRODUCTO 
export const productsDetailsReducer= (state = { product: {}}, action) => {
    switch (action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading:true

            }
        
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading:false,
                product:action.payload
                
            }  
        
        case PRODUCT_DETAILS_FAILED: 
            return {
                ...state,
                error:action.payload
            }
        
            
            
        case CLEAR_ERRORS: 
            return {
                ...state,
                error:null
            }
        
            
    
        default:
            return state;
          
    }
}