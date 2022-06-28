import dotenv from "dotenv";
dotenv.config();
const { REACT_APP_API_URL } = process.env;

export const post = (url, body) => {
  const token = localStorage.getItem("Islam_auth_token");
  const bodyOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Islam_auth_token: token,
      credentials: "include",
    },
    body: JSON.stringify(body),
  };
  return fetch(`${REACT_APP_API_URL}${url}`, bodyOptions);
};
export const get = (url) => {
  const bodyOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      credentials: "include",
    },
  };
  return fetch(`${REACT_APP_API_URL}${url}`, bodyOptions)
};
export const put = (url, body = {}) => {
  const token = localStorage.getItem("Islam_auth_token");
  const bodyOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Islam_auth_token: token,
      credentials: "include",
    },
    body: JSON.stringify(body),
  };
  return fetch(`${REACT_APP_API_URL}${url}`, bodyOptions);
};

export const del = (url, body = {}) => {
  const token = localStorage.getItem("Islam_auth_token");

  const bodyOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Islam_auth_token: token,
      credentials: "include",
    },
    body: JSON.stringify(body),
  };
  return fetch(`${REACT_APP_API_URL}${url}`, bodyOptions);
};
