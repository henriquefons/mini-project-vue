<template>
  <section>
    <div class="d-flex justify-content-center mt-5" v-if="loadingPost">
      <div class="spinner-border text-dark" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="container" v-if="!loadingPost && post">
      <h4 class="text-dark mt-3">{{post.title}}</h4>
      <p class="fw-light body-post">{{post.body}}</p>
      <div class="col-12" v-if="post.comments_id">
        <h6 class="text-dark mt-3">Comentários</h6>
        <label for="comment" class="form-label">Adicionar comentário</label>
        <textarea rows="2" type="string" class="form-control" id="comment"></textarea>
        <button class="btn btn-secondary float-end mt-2">
          Comentar
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  created() {
    if (this.$route.params.id) {
      this.getPostById(this.$route.params.id);
    }
  },
  unmounted() {
    this.resetPostState();
  },
  computed: {
    ...mapGetters('post', ['loadingPost', 'post']),
  },
  methods: {
    ...mapActions('post', ['getPostById']),
    ...mapMutations('post', ['resetPostState']),
  },
}
</script>

<style scoped>
  .body-post {
    text-align: justify;
  }
</style>
