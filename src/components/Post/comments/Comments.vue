<template>
  <div class="col-12" v-if="!commentsId">
    <h6 class="text-dark mt-3">Comentários</h6>
    <label for="comment" class="form-label">Adicionar comentário</label>
    <textarea v-model="comment" rows="2" type="string" class="form-control" id="comment"></textarea>
    <button :disabled="loadingComment" @click="newComment()" class="btn btn-secondary float-end mt-2">
      {{ loadingComment ? 'Comentando' : 'Comentar'}}
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      comment: '',
    }
  },
  computed: {
    ...mapGetters('storage', ['currentUser']),
    ...mapGetters('comment', ['loadingComment', 'comments']),
  },
  methods: {
    ...mapActions('comment', ['createComment']),
    newComment() {
      const comment = {
        post_id: this.postId,
        body: this.comment,
        name: this.currentUser.name,
        email: this.currentUser.email,
      };
      this.createComment(comment);
    }
  },
  props: {
    postId: Number,
    commentsId: Number,
  },
}
</script>

<style scoped>
  .body-post {
    text-align: justify;
  }
</style>
