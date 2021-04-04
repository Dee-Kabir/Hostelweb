import { isAuthenticated } from "../auth/index";
import queryString from "query-string";
import { API_POST } from "../Config";
import { API } from "../Config";

export const create = (userId, token, post) => {
  return fetch(`${API_POST}/post/new/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: post,
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const list = () => {
  return fetch(`${API_POST}/posts`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const singlePost = (postId) => {
  return fetch(`${API_POST}/post/${postId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};
export const listByUser = (userId, token) => {
  return fetch(`${API_POST}/posts/by/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",

      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};
export const deletepost = (postId) => {
  return fetch(`${API_POST}/post/${postId}`, {
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
export const update = (postId, token, post) => {
  return fetch(`${API_POST}/posts/${postId}`, {
    method: "put",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: post,
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};
export const like = (userId, token, postId) => {
  return fetch(`${API_POST}/post/like`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, postId }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};
export const unlike = (userId, token, postId) => {
  return fetch(`${API_POST}/post/unlike`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, postId }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};
export const comment = (userId, token, postId, comment) => {
  return fetch(`${API_POST}/post/comment`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, postId, comment }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};
export const uncomment = (userId, token, postId, comment) => {
  return fetch(`${API_POST}/post/uncomment`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, postId, commentId: comment }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const subcomments = (id) => {
  return fetch(`${API}/reply/comments/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};
export const listSearch = (params) => {
  let query = queryString.stringify(params);
  return fetch(`${API_POST}/posts/search?${query}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const SearchUser = (params) => {
  let query = queryString.stringify(params);
  return fetch(`${API}/users/search?${query}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};
