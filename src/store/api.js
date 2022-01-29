import axios from "axios";

const api = axios.create({
  baseURL: "https://gorest.co.in/",
});


const token = "6d357604a770a1022565d356426eacd0170c4c9f4d9442c8871f03d97cbd0cce";
api.defaults.headers["Authorization"] = "Bearer " + token;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
