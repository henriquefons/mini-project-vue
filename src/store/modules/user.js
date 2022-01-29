import userApi from "../../api/user";

const getDefaultState = () => {
  return {
    user: null,
    error: null,
    loading: false,
  };
};

const state = getDefaultState();

const getters = {
  user: (state) => state.user,
  errorUser: (state) => state.error,
  loadingUser: (state) => state.loading,
};

const actions = {
  getUsers({ commit }) {
    commit("setLoading", true);
    userApi
      .getUsers()
      .then((data) => {
        commit("setLoading", false);
        if (data) commit("setUser", data.data);
      })
      .catch((error) => {
        throw error;
      });
  },
  createUser({ commit }, data) {
    commit("resetUserState");
    commit("setLoading", true);
    userApi
      .createUser(data)
      .then((data) => {
        commit("setLoading", false);
        commit("setUser", data.data);
      })
      .catch((error) => {
        commit("setLoading", false);
        commit("setError", error.response?.data?.data);
        throw error;
      });
  },
  editUser({ commit }, { id, data }) {
    commit("setLoading", true);
    userApi
      .editUser(id, data)
      .then((data) => {
        commit("setLoading", false);
        console.log(data);
      })
      .catch((error) => {
        throw error;
      });
  },
};

const mutations = {
  resetUserState(state) {
    return Object.assign(state, getDefaultState());
  },
  setUser(state, user) {
    return (state.user = user);
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
