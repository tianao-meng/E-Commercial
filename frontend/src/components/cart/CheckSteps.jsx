import React from "react";
import { Link } from "react-router-dom";

const CheckSteps = ({ shipping, confirm, payment }) => {
  return (
    <div className="d-flex mt-5 mb-0 justify-content-center ">
      {shipping ? (
        <div className="d-flex mt-5 justify-content-center">
          <div className="arrow-left active"></div>
          <div className="arrow-middle active d-flex align-items-center justify-content-center">
            <Link
              to="/shipping"
              className="text-light text-center "
              style={{ textDecoration: "none", fontWeight: 700 }}
            >
              Shipping
            </Link>
          </div>
          <div className="arrow-right active"></div>
        </div>
      ) : (
        <div className="d-flex mt-5 justify-content-center">
          <div className="arrow-left inactive"></div>
          <div className="arrow-middle inactive d-flex align-items-center justify-content-center ">
            <Link
              className="text-light text-center text-black-50"
              style={{
                textDecoration: "none",
                fontWeight: 700,
                cursor: "default",
              }}
            >
              Shipping
            </Link>
          </div>
          <div className="arrow-right inactive"></div>
        </div>
      )}

      {confirm ? (
        <div className="d-flex mt-5 justify-content-center">
          <div className="arrow-left active"></div>
          <div className="arrow-middle active middle ">
            <Link
              className="text-light"
              style={{ textDecoration: "none", fontWeight: 700 }}
              to="/confirm"
            >
              Confirm Order
            </Link>
          </div>
          <div className="arrow-right active"></div>
        </div>
      ) : (
        <div className="d-flex mt-5 justify-content-center">
          <div className="arrow-left inactive"></div>
          <div className="arrow-middle inactive middle ">
            <Link
              className="text-black-50"
              style={{
                textDecoration: "none",
                fontWeight: 700,
                cursor: "default",
              }}
            >
              Confirm Order
            </Link>
          </div>
          <div className="arrow-right inactive"></div>
        </div>
      )}

      {payment ? (
        <div className="d-flex mt-5 justify-content-center">
          <div className="arrow-left active"></div>
          <div className="arrow-middle active d-flex align-items-center justify-content-center">
            <Link
              className="text-light text-center "
              style={{ textDecoration: "none", fontWeight: 700 }}
              to="/payment"
            >
              Payment
            </Link>
          </div>
          <div className="arrow-right active"></div>
        </div>
      ) : (
        <div className="d-flex mt-5 justify-content-center">
          <div className="arrow-left inactive"></div>
          <div className="arrow-middle inactive d-flex align-items-center justify-content-center ">
            <Link
              className="text-light text-center text-black-50"
              style={{
                textDecoration: "none",
                fontWeight: 700,
                cursor: "default",
              }}
            >
              Payment
            </Link>
          </div>
          <div className="arrow-right inactive"></div>
        </div>
      )}
    </div>
  );
};

export default CheckSteps;
