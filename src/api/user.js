import api from "../store/api";

export default {
  getUsers() {
    return new Promise((resolve, reject) => {
      api
        .get('/users')
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  },
  editUser(id, data) {
    return new Promise((resolve, reject) => {
      api
        .put(`/users/${id}`, data)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  },
};
