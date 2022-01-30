import commentApi from "../../api/comment";

const getDefaultState = () => {
  return {
    comments: null,
    error: null,
  };
};

const state = {
  ...getDefaultState(),
  loading: false,
}

const getters = {
  comments: (state) => state.comments,
  errorComment: (state) => state.error,
  loadingComment: (state) => state.loading,
};

const actions = {
  getComments({ commit }, data) {
    commit("resetCommentState", true);
    commit("setLoading", true);
    commentApi
      .getComments(data)
      .then((data) => {
        commit("setLoading", false);
        if (data) commit("setComment", data.data);
      })
      .catch((error) => {
        commit("setLoading", false);
        throw error;
      });
  },
  createComment({ commit }, data) {
    commit("setLoading", true);
    commentApi
      .createComment(data)
      .then((data) => {
        console.log(data)
        commit("setComment", data.data);
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
  resetCommentState(state) {
    return Object.assign(state, getDefaultState());
  },
  setComment(state, comment) {
    return (state.comments = comment);
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
