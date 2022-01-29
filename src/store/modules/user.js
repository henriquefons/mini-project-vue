import userApi from "../../api/user";

const getDefaultState = () => {
  return {
    user: null,
    loading: false,
  };
};

const state = getDefaultState();

const getters = {
  user: (state) => state.user,
  loadingUser: (state) => state.loading,
};

const actions = {
  getUsers({ commit }) {
    commit("setLoading", true);
    userApi
      .getUsers()
      .then((data) => {
        commit("setLoading", false);
        commit("setUser", data);
      })
      .catch((error) => {
        throw error;
      });
  },
  editUser({ commit }, { id, data }) {
    commit("setLoading", true);
    userApi
      .editUser(id, data)
      .then((data) => {
        commit("setLoading", false);
        console.log(data)
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
