import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] =
    useState({
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
      const { data } =
        await api.post(
          "/users/login",
          formData
        );

      login(data);
      toast.success("Login Successful");

      if (data.user.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/profile");
      }

      navigate("/dashboard");
    } catch (error) {
      toast.error("Login Failed");
    }
  };

  return (
    <div className="max-w-md mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Login
      </h1>

      <form
        onSubmit={submitHandler}
        className="space-y-4"
      >

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
          Login
        </button>

      </form>

    </div>
  );
};

export default LoginPage;