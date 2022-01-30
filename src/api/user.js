import api from "../store/api";

export default {
  getUsers(data) {
    return new Promise((resolve, reject) => {
      api
        .get('/users', { params: data || {} })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  },
  createUser(data) {
    return new Promise((resolve, reject) => {
      api
        .post('/users', data)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  },
  editUser(data) {
    return new Promise((resolve, reject) => {
      api
        .put(`/users/${data.id}`, data)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  },
};
