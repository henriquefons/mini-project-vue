import { createStore } from 'vuex'
import user from './modules/user'
import post from './modules/post'
import storage from './modules/storage'
import comment from './modules/comment'
import todo from './modules/todo'

export default new createStore({
  modules: {
    user,
    post,
    todo,
    comment,
    storage,
  },
})