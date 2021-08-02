import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { useAlert } from "react-alert";
import MetaData from "../layouts/MetaData";
import { Link } from "react-router-dom";

import {
  addToCartAction,
  deleteFromCartAction,
} from "../../actions/cartActions";
const Cart = ({ history }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  function increaseQty(id, quantity, stock) {
    if (quantity >= stock) {
      return;
    }
    quantity = quantity + 1;
    dispatch(addToCartAction(id, quantity));
  }

  function decreaseQty(id, quantity) {
    if (quantity <= 1) {
      return;
    }
    quantity = quantity - 1;

    dispatch(addToCartAction(id, quantity));
  }

  function handleDelete(id) {
    dispatch(deleteFromCartAction(id));
  }

  function checkHandler(e) {
    e.preventDefault();
    history.push("/login?redirect=shipping");
  }
  return (
    <>
      {cartItems.length === 0 ? (
        <h2 className="mt-5"> Your Cart is Empty</h2>
      ) : (
        <>
          <MetaData title="Cart" />
          <p className="carNum">
            Your Cart: <span>{cartItems.length} items</span>
          </p>
          <div className="row">
            <div className="col-8">
              {cartItems.map((cartItem) => {
                return (
                  <div className="row">
                    <hr className="mb-5" />

                    <img
                      className="col-2"
                      src={cartItem.image}
                      alt={cartItem.name}
                    />

                    <Link
                      to={`/product/${cartItem.product}`}
                      className="col-3 text-dark"
                      style={{ textDecoration: "none" }}
                    >
                      {cartItem.name}
                    </Link>

                    <p className="col-2">{cartItem.price}</p>
                    <div className="col-1 d-flex justify-content-center p-0">
                      <button
                        className="btn-primary qty-btn"
                        onClick={() =>
                          increaseQty(
                            cartItem.product,
                            cartItem.quantity,
                            cartItem.stock
                          )
                        }
                      >
                        +
                      </button>
                    </div>

                    <span className="col-1 text-center">
                      {cartItem.quantity}
                    </span>
                    <div className="col-1 d-flex justify-content-center p-0">
                      <button
                        className="btn-danger qty-btn"
                        onClick={() =>
                          decreaseQty(cartItem.product, cartItem.quantity)
                        }
                      >
                        -
                      </button>
                    </div>
                    <div className="col-1  ps-5">
                      <i
                        class="fas fa-trash-alt  text-danger"
                        onClick={() => handleDelete(cartItem.product)}
                        style={{ cursor: "pointer" }}
                      ></i>
                    </div>

                    <hr className="mt-5" />
                  </div>
                );
              })}
            </div>
            <div className="col-4">
              <div className="text-start orderSummary">
                <div>
                  <h4 style={{ "font-size": "18px" }}>Order Summary</h4>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <p>Subtotal:</p>
                    <strong>
                      {cartItems.reduce(
                        (acc, cartItem) => acc + cartItem.quantity,
                        0
                      )}
                      (Units)
                    </strong>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>Est. total:</p>
                    <strong>
                      $
                      {cartItems
                        .reduce(
                          (acc, cartItem) =>
                            acc + cartItem.quantity * cartItem.price,
                          0
                        )
                        .toFixed(2)}
                    </strong>
                  </div>

                  <hr />
                </div>
                <button
                  className="bg-warning text-light check-btn"
                  onClick={checkHandler}
                >
                  Check Out
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
