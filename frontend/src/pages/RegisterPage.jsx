import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        "/users/register",
        formData
      );

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      alert("Registration Failed");
    }
  };

  return (
    <div className="max-w-md mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Register
      </h1>

      <form
        onSubmit={submitHandler}
        className="space-y-4"
      >

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border w-full p-3 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border w-full p-3 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border w-full p-3 rounded"
        />

        <button
          className="bg-black text-white w-full p-3 rounded"
        >
          Register
        </button>

      </form>

    </div>
  );
};

export default RegisterPage;