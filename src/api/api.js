import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  headers: { Accept: "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry && error.config.url !== "/token/") {
      // prevents loop
      error.config._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token")

        if (!refreshToken) {
          window.location.href = "/login"
          return error.response.data.detail;
        }

        const { data } = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/token/refresh/`, {
          refresh: refreshToken,
        });

        localStorage.setItem("access_token", data.access);
        api.defaults.headers.Authorization = `Bearer ${data.access}`;
        error.config.headers.Authorization = `Bearer ${data.access}`;

        return api(error.config);
      } catch (refreshError) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login"

        return "Refresh token failed", refreshError
      }
    }
    return Promise.reject(error);
  }
);

export default api;
