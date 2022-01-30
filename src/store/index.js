import { createStore } from 'vuex'
import user from './modules/user'
import post from './modules/post'
import storage from './modules/storage'

export default new createStore({
  modules: {
    user,
    post,
    storage,
  },
})