import todoApi from "../../api/todo";

const getDefaultState = () => {
  return {
    newTodos: [],
    todos: null,
    error: null,
    loading: false,
  };
};

const state = getDefaultState();

const getters = {
  todos: (state) => state.todos,
  newTodos: (state) => state.newTodos,
  errorTodo: (state) => state.error,
  loadingTodo: (state) => state.loading,
};

const actions = {
  getTodos({ commit }, { userId, params }) {
    commit("setLoading", true);
    todoApi
      .getTodos(userId, params)
      .then((data) => {
        commit("setLoading", false);
        commit("setTodo", data.data);
      })
      .catch((error) => {
        commit("setLoading", false);
        commit("setError", error.response?.data?.data);
        throw error;
      });
  },
  createTodo({ commit, state }, { data, index }) {
    if (state.error) commit("setError", false);
    commit("setLoading", true);
    todoApi
      .createTodo(data)
      .then((data) => {
        commit("setLoading", false);
        if (data?.data) {
          commit("addTodo", data.data);
          commit("removeNewTodo", index);
        } 
      })
      .catch((error) => {
        commit("setLoading", false);
        commit("setError", error.response?.data?.data);
        throw error;
      });
  },
};

const mutations = {
  resetTodoState(state) {
    return Object.assign(state, getDefaultState());
  },
  setTodo(state, todo) {
    return (state.todos = todo);
  },
  addTodo(state, todo) {
    return (state.todos.unshift(todo));
  },
  setError(state, error) {
    return (state.error = error);
  },
  setLoading(state, loading) {
    return (state.loading = loading);
  },
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
