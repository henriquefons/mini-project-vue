<template>
  <section>
    <div class="container">
      <div class="row mt-3" @input="onSearch" >
        <div class="d-flex justify-content-between">
          <h4 class="text-dark">Filtrar Posts</h4>
          <router-link class="btn btn-outline-primary" to="/post/new">Criar Post</router-link>
        </div>
        <div class="col-md-1 col-sm-2">
          <label for="email" class="form-label">ID</label>
          <input  v-model="formData.id" type="text" class="form-control" id="email" aria-describedby="email">
        </div>
        <div class="col-md-6 col-sm-6">
          <label for="name" class="form-label">Título</label>
          <input v-model="formData.title" type="text" class="form-control" id="name" aria-describedby="name">
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
      formData: {
        title: '',
        id: '',
      }
    }
  },
  created() {
    this.getPosts();
  },
  unmounted() {
    this.resetPostState();
  },
  computed: {
    ...mapGetters('post', ['loadingPost', 'post']),
  },
  methods: {
    ...mapActions('post', ['getPosts']),
    ...mapMutations('post', ['resetPostState']),
    onSearch() {
      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.getPosts(this.formData)
      }, 700)
    }
  },
}
</script>

<style scoped>

</style>
