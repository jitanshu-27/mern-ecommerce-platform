import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";

const CheckoutPage = () => {
  const navigate = useNavigate();

  const {
    shippingAddress,
    saveShippingAddress,
  } = useCart();

  const [formData, setFormData] =
    useState(shippingAddress);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    saveShippingAddress(
      formData
    );

    navigate("/placeorder");
  };

  return (
    <div className="max-w-md mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Shipping Address
      </h1>

      <form
        onSubmit={
          submitHandler
        }
        className="space-y-4"
      >

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={
            formData.address
          }
          onChange={
            handleChange
          }
          className="border w-full p-3 rounded"
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={
            handleChange
          }
          className="border w-full p-3 rounded"
        />

        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={
            formData.postalCode
          }
          onChange={
            handleChange
          }
          className="border w-full p-3 rounded"
        />

        <input
          type="text"
          name="country"
          placeholder="Country"
          value={
            formData.country
          }
          onChange={
            handleChange
          }
          className="border w-full p-3 rounded"
        />

        <button
          className="bg-black text-white w-full p-3 rounded"
        >
          Continue
        </button>

      </form>

    </div>
  );
};

export default CheckoutPage;