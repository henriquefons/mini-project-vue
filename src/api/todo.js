
import api from "../store/api";

export default {
  getTodos(userId, params) {
    return new Promise((resolve, reject) => {
      api
        .get(`/users/${userId}/todos`, { params: params || {} })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  },
  createTodo(data) {
    return new Promise((resolve, reject) => {
      api
        .post(`/users/${data.user_id}/todos`, data)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  },
};
