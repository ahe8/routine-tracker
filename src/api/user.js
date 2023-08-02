import { get, post } from "../utils/fetchUtils";

export const apiGetMyUserInfo = () => {
  return get("http://localhost:5001/api/auth/authUser");
};

export const apiLogout = () => {
  return post("http://localhost:5001/api/auth/logout");
};

export const apiLogin = (data) => {
  return post("http://localhost:5001/api/auth/login", data);
};
