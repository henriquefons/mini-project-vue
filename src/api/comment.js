
import api from "../store/api";

export default {
  getComments(postId, params) {
    return new Promise((resolve, reject) => {
      api
        .get(`/posts/${postId}/comments`, { params: params || {} })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  },
  createComment(data) {
    return new Promise((resolve, reject) => {
      api
        .post('/comments', data)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  },
};
