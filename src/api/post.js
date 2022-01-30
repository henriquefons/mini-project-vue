
import api from "../store/api";

export default {
  getPosts(data) {
    return new Promise((resolve, reject) => {
      api
        .get('/posts', { params: data || {} })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  },
  createPost(data) {
    return new Promise((resolve, reject) => {
      api
        .post('/posts', data)
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
