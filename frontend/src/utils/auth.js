export const baseUrl = "https://auth.nomoreparties.co/";

export const register = (userData) => {
  return fetch(`${baseUrl}signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: userData.password,
      email: userData.email,
    }),
  }).then(checkResponse);
};

export const login = (userData) => {
  return fetch(`${baseUrl}signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: userData.password,
      email: userData.email,
    }),
  }).then(checkResponse);
};

export const checkToken = (jwt) => {
  return fetch(`${baseUrl}users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then(checkResponse);
};

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};
