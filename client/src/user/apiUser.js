import { isAuthenticated } from "../auth/index";
import { API } from "../Config";
export const read = (Id) => {
  return fetch(`${API}/user/${Id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const list = () => {
  return fetch(`${API}/users`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};
export const deleteaccount = (id) => {
  return fetch(`${API}/user/${isAuthenticated().user._id}`, {
    method: "delete",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};
export const update = (user) => {
  return fetch(`${API}/user/${isAuthenticated().user._id}`, {
    method: "Put",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`,
    },
    body: user,
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const follow = (userId, token, followId) => {
  return fetch(`${API}/user/follow`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, followId }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};
export const unfollow = (userId, token, unfollowId) => {
  return fetch(`${API}/user/unfollow`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, unfollowId }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};
