import {
  ADD_TO_CART_REQUEST,
  DELETE_FROM_CART_REQUEST,
  SAVE_SHIPPING_INFO_REQUEST,
} from "../constants/cartConstants";

import axios from "axios";

export const addToCartAction = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);

  dispatch({
    type: ADD_TO_CART_REQUEST,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const deleteFromCartAction = (id) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_FROM_CART_REQUEST,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingInfoAction = (shippingInfo) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO_REQUEST,
    payload: shippingInfo,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));
};
