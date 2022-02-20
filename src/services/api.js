import axios from "axios";

// this http instance will be used through out
const http = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
export default http;

export const setAccessTokenHeader = ({ token }) => {
  http.defaults.headers.common = { Authorization: `Bearer ${token}` };
  return;
};

// all api calls
export const apiCreateUser = (payload, cancelToken) => {
  return http.post("/users", payload, { cancelToken: cancelToken });
};

export const apiCreateSession = (payload, cancelToken) => {
  return http.post("/sessions", payload, { cancelToken: cancelToken });
};

export const apiCreateSession = (payload, cancelToken) => {
  return http.get("/users", { cancelToken: cancelToken });
};
