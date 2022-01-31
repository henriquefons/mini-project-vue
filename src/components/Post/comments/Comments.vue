<template>
  <div class="col-12 mt-5" >
    <h6 class="text-dark">Comentários</h6>
    <div class="col-12 view-comments" v-if="comments">
      <div class="card border-dark mb-2" v-for="c in comments" :key="c.id">
        <div class="card-header">{{ c.name }} comentou...</div>
        <div class="card-body">
          <p class="card-text">{{ c.body }}</p>
        </div>
      </div>
    </div>
    <div class="col-12 view-comments" v-if="!comments">
      <div v-if="loadingComment" class="spinner-border text-dark" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div v-if="!loadingComment">
        Não há comentários
      </div>
    </div>
    <label for="comment" class="form-label">Adicionar comentário</label>
    <textarea :class="errors.body && 'is-invalid'" v-model="comment" rows="2" type="string" class="form-control" id="comment"></textarea>
    <div v-if="errors.body" class="invalid-feedback">{{errors.body}}</div>
    <div class="col-12 d-flex justify-content-between align-items-center mt-3">
      <router-link class="btn btn-warning" to="/post">Voltar</router-link>
      <button :disabled="loadingComment" @click="newComment()" class="btn btn-secondary float-end mt-2">
      {{ loadingComment ? 'Comentando' : 'Comentar'}}
    </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      comment: '',
    }
  },
  created() {
    this.getComments({ postId: this.postId })
  },
  unmounted() {
    this.resetCommentState()
  },
  computed: {
    ...mapGetters('storage', ['currentUser']),
    ...mapGetters('comment', ['loadingComment', 'comments', 'errorComment']),
    errors() {
      if (!this.errorComment) return {};
      // converte o array em um objeto
      const error = this.errorComment.reduce((acc, { field, message }) => {
        acc[field] = message;
        return acc;
      }, {})
      return error;
    },
  },
  methods: {
    ...mapActions('comment', ['createComment', 'getComments']),
    ...mapMutations('comment', ['resetCommentState']),
    newComment() {
      const comment = {
        post_id: this.postId,
        body: this.comment,
        name: this.currentUser.name,
        email: this.currentUser.email,
      };
      this.createComment(comment);
      this.comment = '';
    }
  },
  props: {
    postId: Number,
  },
}
</script>

<style scoped>
  .body-post {
    text-align: justify;
  }
</style>
