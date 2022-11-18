import { ALL_PRODUCTS_FAILED, ALL_PRODUCTS_SUCCESS, ALL_PRODUCTS_REQUEST, CLEAR_ERRORS,PRODUCT_DETAILS_FAILED,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_REQUEST, ADMIN_PRODUCTS_REQUEST, ADMIN_PRODUCTS_SUCCESS, ADMIN_PRODUCTS_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, NEW_PRODUCT_RESET, NEW_PRODUCT_FAIL} from "../constants/productConstans";


//VER PRODUCTOS
export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type){
        case ALL_PRODUCTS_REQUEST:
        case ADMIN_PRODUCTS_REQUEST:
            return {
                loading: true,
                products:[]

            }
        
        case ALL_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resPerPage: action.payload.resPerPage,
                filteredProductsCount: action.payload.filteredProductsCount
            }
        
        case ADMIN_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products:action.payload
            }
        
        case ALL_PRODUCTS_FAILED: 
        case ADMIN_PRODUCTS_FAIL:
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

export const newProductReducer = (state = { product: {} }, action )=> {
    switch (action.type) {
        case NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                product: action.payload.product
            }
        case NEW_PRODUCT_FAIL:
            return {
                ...state,
                error:action.payload
            }
        case NEW_PRODUCT_RESET:
            return {
                ...state,
                success: false
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
