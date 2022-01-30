<template>
  <div class="col-12" v-if="post.comments_id">
    <h6 class="text-dark mt-3">Comentários</h6>
    <label for="comment" class="form-label">Adicionar comentário</label>
    <textarea rows="2" type="string" class="form-control" id="comment"></textarea>
    <button class="btn btn-secondary float-end mt-2">
      Comentar
    </button>
  </div>
</template>

<script>
export default {
  created() {
  },
  unmounted() {
  },
  computed: {
  },
  props: {
  },
}
</script>

<style scoped>
  .body-post {
    text-align: justify;
  }
</style>
