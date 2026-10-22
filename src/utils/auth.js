export const baseUrl = "http://localhost:3001";
export const signupUrl = `${baseUrl}/signup`;
export const loginUrl = `${baseUrl}/signin`;

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function register({ name, avatar, email, password }) {
  return fetch(signupUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);
}

function login({ email, password }) {
  return fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

function checkToken(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export { register, login, checkToken };
