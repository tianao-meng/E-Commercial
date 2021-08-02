import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import MetaData from "../layouts/MetaData";
import { countries } from "countries-list";
import { saveShippingInfoAction } from "../../actions/cartActions";
import CheckSteps from "./CheckSteps";

const Shipping = ({ history }) => {
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
  const [country, setCountry] = useState(shippingInfo.country);
  const countryList = Object.values(countries);
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      saveShippingInfoAction({
        address,
        city,
        phoneNo,
        postalCode,
        country,
      })
    );
    history.push("/confirm");
  }
  return (
    <>
      <MetaData title="Shipping Info" />
      <CheckSteps shipping />
      <div className="shippingCard mt-5">
        <h1>Shipping Info</h1>
        <form className="shippingForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              <strong>Address</strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="form-label">
              <strong>City</strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phoneNo" className="form-label">
              <strong>Phone No</strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="phoneNo"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="postalCode" className="form-label">
              <strong>Postal Code</strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="postalCode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <label htmlFor="country" className="form-label">
            <strong>Country</strong>
          </label>
          <div className="mb-3">
            <select
              class="form-select"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              {countryList.map((country) => (
                <option>{country.name}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-warning mt-4 text-light">
            CONTINUE
          </button>
        </form>
      </div>
    </>
  );
};

export default Shipping;
