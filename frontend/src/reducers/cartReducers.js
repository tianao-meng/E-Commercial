import {
  ADD_TO_CART_REQUEST,
  DELETE_FROM_CART_REQUEST,
  SAVE_SHIPPING_INFO_REQUEST,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
      const item = action.payload;
      const cartItemFinded = state.cartItems.find(
        (cartItem) => cartItem.product === item.product
      );
      if (cartItemFinded) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.product === item.product ? item : cartItem
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case DELETE_FROM_CART_REQUEST:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.product !== action.payload
        ),
      };

    case SAVE_SHIPPING_INFO_REQUEST:
      return {
        ...state,
        shippingInfo: action.payload,
      };
    default:
      return state;
  }
};
