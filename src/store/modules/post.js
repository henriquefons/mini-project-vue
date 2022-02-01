import postApi from "../../api/post";

const getDefaultState = () => {
  return {
    post: null,
    error: null,
  };
};

const state = {
  ...getDefaultState(),
  loading: false,
}

const getters = {
  post: (state) => state.post,
  errorPost: (state) => state.error,
  loadingPost: (state) => state.loading,
};

const actions = {
  getPosts({ commit }, data) {
    commit("resetPostState", true);
    commit("setLoading", true);
    postApi
      .getPosts(data)
      .then((data) => {
        console.log(data)
        commit("setLoading", false);
        if (data) commit("setPost", data.data);
      })
      .catch((error) => {
        commit("setLoading", false);
        throw error;
      });
  },
  getPostById({ commit }, data) {
    commit("setLoading", true);
    postApi
      .getPosts(data)
      .then((data) => {
        commit("setLoading", false);
        if (data) commit("setPost", data.data[0]);
      })
      .catch((error) => {
        commit("setLoading", false);
        throw error;
      });
  },
  createPost({ commit }, data) {
    commit("resetPostState");
    commit("setLoading", true);
    postApi
      .createPost(data)
      .then((data) => {
        commit("setLoading", false);
        commit("setPost", data.data);
      })
      .catch((error) => {
        commit("setLoading", false);
        commit("setError", error.response?.data?.data);
        throw error;
      });
  },
  getPostsByUser({ commit }, { userId, params }) {
    commit("resetPostState", true);
    commit("setLoading", true);
    postApi
      .getPostsByUser(userId, params)
      .then((data) => {
        commit("setLoading", false);
        if (data) commit("setPost", data.data);
      })
      .catch((error) => {
        commit("setLoading", false);
        throw error;
      });
  },
  editPost({ commit }, data) {
    commit("setLoading", true);
    postApi
      .editPost(data)
      .then((data) => {
        commit("setPost", data.data);
        commit("setLoading", false);
      })
      .catch((error) => {
        commit("setLoading", false);
        commit("setError", error.response?.data?.data);
        throw error;
      });
  },
};

const mutations = {
  resetPostState(state) {
    return Object.assign(state, getDefaultState());
  },
  setPost(state, post) {
    return (state.post = post);
  },
  setError(state, error) {
    return (state.error = error);
  },
  setLoading(state, loading) {
    return (state.loading = loading);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
