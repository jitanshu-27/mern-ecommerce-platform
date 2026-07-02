import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


api.interceptors.request.use((config) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (userInfo && userInfo.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }

  return config;
});


api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      "Something went wrong";

    console.error(message);

    return Promise.reject(error);
  }
);

export default api;