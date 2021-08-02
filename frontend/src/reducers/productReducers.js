import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_RESET,
  NEW_REVIEW_FAIL,
  ADMIN_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_SUCCESS,
  ADMIN_PRODUCTS_FAIL,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_RESET,
  NEW_PRODUCT_REQUEST,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_RESET,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_RESET,
  UPDATE_PRODUCT_FAIL,
  PRODUCT_REVIEWS_REQUEST,
  PRODUCT_REVIEWS_SUCCESS,
  PRODUCT_REVIEWS_FAIL,
  PRODUCT_REVIEWS_RESET,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_RESET,
  ERROR_CLEAR,
} from "../constants/productContants";

export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCTS_REQUEST:
    case ADMIN_PRODUCTS_REQUEST:
      return {
        ...state,
        products: [],
        loading: true,
      };

    case ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        productCount: action.payload.productCount,
        productPerPage: action.payload.productPerPage,
        loading: false,
      };
    case ADMIN_PRODUCTS_SUCCESS:
      return {
        products: action.payload,
        loading: false,
      };
    case ALL_PRODUCTS_FAIL:
    case ADMIN_PRODUCTS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case ERROR_CLEAR:
      // ..state?
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        product: action.payload.product,
        loading: false,
        error: null,
      };

    case PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case ERROR_CLEAR:
      // ..state?
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };

    case NEW_REVIEW_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        error: null,
      };

    case NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
      };

    case NEW_REVIEW_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case ERROR_CLEAR:
      // ..state?
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const newProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };

    case NEW_PRODUCT_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        error: null,
        product: action.payload,
      };

    case NEW_PRODUCT_RESET:
      return {
        ...state,
        success: false,
      };

    case NEW_PRODUCT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case ERROR_CLEAR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};


export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        isDeleted: false,
      };

    case UPDATE_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true,
          
        };

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        isDeleted: true,
        loading: false,
        error: null,
      };

    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: true,
        error:null
      };

    case DELETE_PRODUCT_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case UPDATE_PRODUCT_RESET:
      return {
        ...state,

        isUpdated: false,
      
      };

    case DELETE_PRODUCT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case ERROR_CLEAR:
      // ..state?
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};


export const reviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {

    case PRODUCT_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PRODUCT_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: action.payload,
        loading: false,
      };

    case PRODUCT_REVIEWS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case PRODUCT_REVIEWS_RESET: 
      return {
        ...state,
        reviews: [],
        
      };
    case ERROR_CLEAR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};



export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
        isDeleted: false,
      };

    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        isDeleted: true,
        loading: false,
        error: null,
      };

    case DELETE_REVIEW_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case ERROR_CLEAR:
      // ..state?
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
