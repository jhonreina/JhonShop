import { ALL_PRODUCTS_FAILED, ALL_PRODUCTS_SUCCESS , ALL_PRODUCTS_REQUEST, CLEAR_ERRORS} from "../constants/productConstans";

export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST:
            return {
                loading: true,
                products:[]

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