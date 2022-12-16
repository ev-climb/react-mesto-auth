export const BASE_URL = "https://auth.nomoreparties.co";

function request({ url, token, method = "POST", data }) {
  return fetch(`${BASE_URL}${url}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...(!!token && { Authorization: `Bearer ${token}` }),
    },
    ...(!!data && { body: JSON.stringify(data) }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  });
}

export const register = (email, password ) => {
  return request({
    url: "/signup",
    data: { email, password },
  });
};

export const authorization = (email, password) => {
  return request({
    url: "/signin",
    data: { email, password },
  });
};

export const getContent = (token) => {
  return request({
    url: "/users/me",
    method: "GET",
    token: token,
  });
};