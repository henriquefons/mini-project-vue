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
      if (!data) return alert('Aconteceu um error')
      localStorage.setItem('current-user-blog', JSON.stringify(data))
      commit("setCurrentUser", data);
      alert(`Logado com o usuário ${data.name}`)
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
