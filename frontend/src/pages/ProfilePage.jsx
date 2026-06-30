import {
  useEffect,
  useState,
} from "react";

import api from "../services/api";

const ProfilePage = () => {
  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile =
    async () => {
      try {
        const { data } =
          await api.get(
            "/users/profile"
          );

        setFormData({
          name: data.user.name,
          email: data.user.email,
          password: "",
        });
      } catch (error) {
        alert(
          "Failed to load profile"
        );
      }
    };

  const handleChange = (
    e
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const submitHandler =
    async (e) => {
      e.preventDefault();

      try {
        await api.put(
          "/users/profile",
          formData
        );

        alert(
          "Profile Updated"
        );
      } catch (error) {
        alert(
          "Update Failed"
        );
      }
    };

  return (
    <div className="max-w-md mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        My Profile
      </h1>

      <form
        onSubmit={
          submitHandler
        }
        className="space-y-4"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={
            handleChange
          }
          className="border w-full p-3 rounded"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={
            handleChange
          }
          className="border w-full p-3 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="New Password"
          value={
            formData.password
          }
          onChange={
            handleChange
          }
          className="border w-full p-3 rounded"
        />

        <button
          className="bg-black text-white w-full p-3 rounded"
        >
          Update Profile
        </button>

      </form>

    </div>
  );
};

export default ProfilePage;