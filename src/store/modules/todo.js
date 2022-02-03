const getDefaultState = () => {
  return {
    newTodos: [],
  };
};

const state = getDefaultState();

const getters = {
  newTodos: (state) => state.newTodos,
};

const actions = {
};

const mutations = {
  addNewTodos(state, todo) {
    return (state.newTodos.push(todo));
  },
  removeNewTodo(state, index) {
    return (state.newTodos.splice(index, 1));
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
