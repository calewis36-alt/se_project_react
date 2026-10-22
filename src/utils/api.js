const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

function addItem({ name, imageUrl, weather }) {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);
}

function deleteItem(id) {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

function addCardLike(id) {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

function removeCardLike(id) {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export { getItems, addItem, deleteItem, addCardLike, removeCardLike, baseUrl };
