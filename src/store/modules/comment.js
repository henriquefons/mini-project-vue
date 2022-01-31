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
  getComments({ commit }, { postId, params }) {
    commit("setLoading", true);
    commentApi
      .getComments(postId, params)
      .then((data) => {
        commit("setLoading", false);
        commit("setComment", data.data);
      })
      .catch((error) => {
        commit("setLoading", false);
        commit("setError", error.response?.data?.data);
        throw error;
      });
  },
  createComment({ commit, state }, data) {
    if (state.error) commit("setError", false);
    commit("setLoading", true);
    commentApi
      .createComment(data)
      .then((data) => {
        commit("setLoading", false);
        if (data?.data) commit("addComment", data.data);
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
  addComment(state, comment) {
    return (state.comments.unshift(comment));
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
