import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import Post from '@/components/Post/Post.vue'

describe('Post.vue', () => {
  let state;
  let getters;
  let store;
  let mutations;

  beforeEach(() => {
    state = {
      user: null
    };

    getters = {
      currentUser: () => state.user,
    };

    mutations = {
      setCurrentUser(state, user) {
        return (state.user = user);
      },
    };

    store = createStore({
      modules: {
        'storage': {
          namespaced: true,
          state,
          getters,
          mutations
        }
      }
    })
  });

  it('User not logged in alert', () => {
    const wrapper = mount(Post, {
      global: {
        plugins: [store]
      }
    })
    expect(wrapper.text()).toContain('Usuário não encontrado!')
  })
  
  it('User inactive not create post in alert', () => {
    store.commit('storage/setCurrentUser', { status: 'inactive' })
    const wrapper = mount(Post, {
      global: {
        plugins: [store]
      }
    })
    expect(wrapper.text()).toContain('O usuário está inativo, não é possivel criar post!')
  })
})
