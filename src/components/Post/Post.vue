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
      <Comments :postId="post.id" :commentsId="post?.comments_id"  />
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Comments from './comments/Comments.vue';
export default {
  components: { 
    Comments
  },
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
