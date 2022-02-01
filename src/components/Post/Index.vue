<template>
  <section>
    <div class="container">
      <div v-if="!currentUser" class="alert alert-warning mt-3" role="alert">
        Para criar um Post, favor entrar com um usuário
        <br>
        <router-link role="button" class="link-dark" :to="`/user`">
          Entrar com usuário
        </router-link>
      </div>
      <div class="row mt-3" @input="onSearch">
        <div class="d-flex justify-content-between">
          <h4 class="text-dark">Filtrar Posts</h4>
          <router-link v-if="currentUser" class="btn btn-outline-primary" to="/post/new">
            Criar Post
          </router-link>
        </div>
        <div class="col-md-1 col-sm-2">
          <label for="email" class="form-label">ID</label>
          <input v-model="formData.id" type="text" class="form-control" id="email" aria-describedby="email">
        </div>
        <div class="col-md-6 col-sm-6">
          <label for="name" class="form-label">Título</label>
          <input v-model="formData.title" type="text" class="form-control" id="name" aria-describedby="name">
        </div>
        <div class="col-md-3 col-sm-4 form-check" v-if="currentUser">
          <br>
          <input v-model="postsByUser" class="form-check-input" type="checkbox" id="postsByUser">
          <label class="form-check-label" for="postsByUser">
            {{ !postsByUser ? 'Mostrar meus Posts' : 'Esconder meus Posts'}}
          </label>
        </div>
      </div>
      <div class="row mt-3">
        <h4 class="text-dark">Listar Posts</h4>
        <div class="d-flex justify-content-center mt-5" v-if="loadingPost">
          <div class="spinner-border text-dark" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div class="col-12" v-if="post">
          <Abstract v-for="p in post" :key="p.id" :post="p" />
        </div>
        <div class="col-12" v-if="!post.length">
          Não foi encontrado Posts
        </div>
        <div class="col-12" v-if="!post.length && currentUser">
          Deseja <router-link v-if="currentUser"  class="text-primary text-decoration-none" to="/post/new">criar um post? </router-link> 
        </div>
      </div>  
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Abstract from './Abstract.vue';
export default {
  components: { 
    Abstract
  },
  data() {
    return {
      timeout: null,
      postsByUser: false,
      formData: {
        title: '',
        id: '',
      }
    }
  },
  created() {
    if (this.currentUser) { // se usuario tiver logado, mostra só seus posts
      this.getPostsByUser({ userId: this.currentUser.id });
      this.postsByUser = true;
    } else {
      this.getPosts();
    }
  },
  unmounted() {
    this.resetPostState();
  },
  computed: {
    ...mapGetters('post', ['loadingPost', 'post']),
    ...mapGetters('storage', ['currentUser']),
  },
  methods: {
    ...mapActions('post', ['getPosts', 'getPostsByUser']),
    ...mapMutations('post', ['resetPostState']),
    onSearch() {
      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        if (this.postsByUser) {
          this.getPostsByUser({ userId: this.currentUser.id, params: this.formData })
        } else{
          this.getPosts(this.formData)
        }
      }, 700)
    }
  },
}
</script>

<style scoped>

</style>
