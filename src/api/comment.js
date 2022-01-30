
import api from "../store/api";

export default {
  getComments(data) {
    return new Promise((resolve, reject) => {
      api
        .get('/comments', { params: data || {} })
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
