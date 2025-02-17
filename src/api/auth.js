import api from "./api";

export const login = async (userDetails) => {
  const { data } = await api.post(`/token/`, userDetails);
  localStorage.setItem("access_token", data.access);
  localStorage.setItem("refresh_token", data.refresh);

  return data;
};

export const register = async (userData) => {
  const { data } = await api.post(`/register/`, userData);
  return data
};

export const getUser = async () => {
  const { data } = await api.get(`/user/`)
  return data
}
