import axios from "axios";

export const fetchCurrentUser = () => {
  return axios.get("/api/users/current");
};

export const updateCurrentUser = (userData) => {
  return axios.patch(`/api/users/${userData.userId}`, userData);
};
