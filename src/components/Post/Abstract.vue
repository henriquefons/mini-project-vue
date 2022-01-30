<template>
  <div class="post border p-3 mt-3">
    <span title="Exitem comentários no Post!" class="float-end badge bg-warning text-dark">Comentário</span>
    <h5 class="mt-0 text-truncate body-title">
      <router-link :to="`/post/edit/${post.id}`">
        #{{ post.id + ' ' + post.title }}
      </router-link>
    </h5>
    <div class="d-inline-block body-post">{{ post.body }}</div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object,
  }
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
