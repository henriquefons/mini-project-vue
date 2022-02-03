<template>
  <div class="post border p-3 mt-3">
    <span v-if="existsCommentInPost" title="Exitem comentários no Post!" class="float-end badge bg-warning text-dark">
      Comentários
    </span>
    <h5 class="mt-0 text-truncate body-title">
      <router-link :to="`/post/${post.id}`">
        #{{ post.id + ' ' + post.title }}
      </router-link>
    </h5>
    <div class="d-inline-block body-post">{{ post.body }}</div>
  </div>
</template>

<script>
import commentApi from "../../api/comment";
export default {
  data() {
    return {
      existsCommentInPost: false,
    }
  },
  created() {
    this.postsWithComments(this.post.id)
  },
  props: {
    post: Object,
  },
  methods: {
    postsWithComments(postId) {
      return commentApi.getComments(postId)
        .then((data) => {
          if (data.data.length) {
            this.existsCommentInPost = true;
          }
        })
        .catch((error) => {throw error});
    },
  },
}
</script>

<style scoped>
  .body-title {
    width: 85%;
  }
  .post .body-post {
    text-align: justify;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    display: -webkit-box !important;
    -webkit-line-clamp: 3 !important;
    -webkit-box-orient: vertical !important;
  }
</style>
