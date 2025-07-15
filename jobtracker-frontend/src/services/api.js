import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/",
});


const refreshToken = async () => {
  try {
    const refresh = localStorage.getItem("refreshToken");
    const response = await axios.post("http://localhost:8000/api/token/refresh/", {
      refresh,
    });
    localStorage.setItem("accessToken", response.data.access);
    return response.data.access;
  } catch (err) {
    console.error("Refresh token failed", err);
    throw err;
  }
};


API.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("accessToken");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Token expired? Try refreshing
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.code === "token_not_valid" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return API(originalRequest); // 🔁 retry original request
      } catch (refreshError) {
        // Refresh failed — log out user
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);


export default API;
