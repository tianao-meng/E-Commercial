import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productsReducer,
  productDetailsReducer,
  newReviewReducer,
  newProductReducer,
  productReducer,
  reviewsReducer,
  reviewReducer
} from "./reducers/productReducers";

import {
  loginAndRegisterReducer,
  updateUserReducer,
  forgetPasswordReducer,
  allUsersReducer,
  userDetailsReducer
} from "./reducers/userReducers";

import {
  newOrderReducer,
  myOrdersReducer,
  orderDetailsReducer,
  adminOrdersReducer,
  orderReducer
} from "./reducers/orderReducers";

import { cartReducer } from "./reducers/cartReducers";

const reducer = combineReducers({
  products: productsReducer,
  product: productDetailsReducer,
  user: loginAndRegisterReducer,
  userUpdated: updateUserReducer,
  forgetPassword: forgetPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  processProduct:productReducer,
  adminOrders:adminOrdersReducer,
  order:orderReducer,
  allUsers:allUsersReducer,
  userDetails:userDetailsReducer,
  reviews:reviewsReducer,
  review:reviewReducer
});

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middlewares = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
