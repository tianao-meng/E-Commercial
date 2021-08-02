import React, { useEffect } from "react";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import CheckSteps from "./CheckSteps";
import { useAlert } from "react-alert";
import { createOrderAction } from "../../actions/orderActions";

import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
const options = {
  style: {
    base: {
      fontSize: "16px",
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const Payment = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useSelector((state) => state.user);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const order = {
    shippingInfo,
    orderItems: cartItems,
  };
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.totalPrice = orderInfo.totalPrice;
  }
  const { error } = useSelector((state) => state.newOrder);

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
  }, [dispatch, alert, error]);
  async function handleSubmit(e) {
    e.preventDefault();
    document.querySelector(".pay-btn").disabled = true;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/v1/payment/process",
        {
          amount: orderInfo.totalPrice * 100,
        },
        config
      );

      if (!stripe || !elements) {
        return;
      }
      const clientSecret = data.client_secret;

      const cardElement = elements.getElement(CardNumberElement);

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: user.name,
          email: user.email,
        },
      });

      const confirmCardPayment = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id,
      });

      if (confirmCardPayment.error) {
        // e.g not enough fund
        alert.error(confirmCardPayment.error.message);
        document.querySelector(".pay-btn").disabled = false;
      } else {
        if (confirmCardPayment.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: confirmCardPayment.paymentIntent.id,
            status: confirmCardPayment.paymentIntent.status,
          };
          dispatch(createOrderAction(order));
          history.push("/success");
        } else {
          alert.error(
            "Some issues happens during process the payment, please Try again"
          );
          document.querySelector(".pay-btn").disabled = false;
        }
      }
    } catch (error) {
      //e.g. no such axios api/ server not launch
      alert.error(error.response.data.message);
      document.querySelector(".pay-btn").disabled = false;
    }
  }
  return (
    <div>
      <MetaData title="CPayment" />
      <CheckSteps shipping confirm payment />
      <div className="paymentCard mt-5">
        <h1>Card Info</h1>
        <form className="paymentForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="cardNo" className="form-label">
              <strong>Card Number</strong>
            </label>
            <CardNumberElement
              type="text"
              className="form-control"
              id="cardNo"
              options={options}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cardExpiry" className="form-label">
              <strong>Card Expiry</strong>
            </label>
            <CardExpiryElement
              type="text"
              className="form-control"
              id="cardExpiry"
              options={options}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="cardCvc" className="form-label">
              <strong>Card CVC</strong>
            </label>
            <CardCvcElement
              type="text"
              className="form-control"
              id="cardCvc"
              options={options}
            />
          </div>

          <button
            type="submit"
            className="btn btn-warning mt-4 text-light pay-btn"
          >
            Pay{orderInfo && ` - $${orderInfo.totalPrice}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
