
import api from "../store/api";

export default {
  getPosts(params) {
    return new Promise((resolve, reject) => {
      api
        .get('/posts', { params: params || {} })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  },
  getPostsByUser(userId, params) {
    return new Promise((resolve, reject) => {
      api
        .get(`/users/${userId}/posts`, { params: params || {} })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  },
  createPost(data) {
    return new Promise((resolve, reject) => {
      api
        .post(`/users/${data.user_id}/posts`, data)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  },
  editPost(data) {
    return new Promise((resolve, reject) => {
      api
        .put(`/posts/${data.id}`, data)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  },
};
