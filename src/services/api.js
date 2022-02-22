import axios from "axios";

// this http instance will be used through out
const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
export default http;

export const setAccessTokenHeader = (token) => {
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

export const apiGetUserInfo = (cancelToken) => {
  return http.get("/users", { cancelToken: cancelToken });
};

export const apiGetUserShares = (cancelToken) => {
  return http.get("/shares", { cancelToken: cancelToken });
};

export const apiCreateLinkShare = (payload, cancelToken) => {
  return http.post("/shares", payload, { cancelToken: cancelToken });
};

export const apiGetSharesPublic = (params, cancelToken) => {
  return http.get("/shares/all", { params, cancelToken });
};

export const apiUpdateLinkShare = (payload, cancelToken) => {
  return http.put(
    `/shares/${payload.id}`,
    {
      title: payload.title,
    },
    { cancelToken: cancelToken }
  );
};

export const apiDeleteLinkShare = (payload, cancelToken) => {
  return http.delete(`/shares/${payload.id}`, { cancelToken: cancelToken });
};
