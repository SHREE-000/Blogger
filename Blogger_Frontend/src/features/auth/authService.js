import axios from "axios";
import { API_URL } from "../constants";

// Register user
export const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Login user
export const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  console.log(response, 'responseee');
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Logout user
export const logout = () => {
  localStorage.removeItem("user");
};
