const getDefaultState = () => {
  return {
    user: null,
  };
};

const state = getDefaultState();

const getters = {
  currentUser: (state) => state.user,
};

const actions = {
  createCurrentUser({ commit }, data) {
    if (data) {
      commit("setCurrentUser", data);
    }
  },
};

const mutations = {
  setCurrentUser(state, user) {
    return (state.user = user);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
