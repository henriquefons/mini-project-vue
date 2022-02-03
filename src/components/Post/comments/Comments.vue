<template>
  <div class="col-12 mt-5" >
    <h6 class="text-dark">Comentários</h6>
    <div class="col-12 view-comments" v-if="comments">
      <div class="card border-dark mb-2" v-for="c in comments" :key="c.id">
        <div class="card-header">
          {{ c.name }} comentou... 
          <span title="Usuário inativo" v-if="userIsInactive(c.email)" class="float-end badge bg-warning text-dark">
            <i class="bi bi-info-lg"></i>
          </span>
        </div>
        <div class="card-body">
          <p class="card-text">{{ c.body }}</p>
        </div>
      </div>
    </div>
    <div class="col-12 view-comments" v-if="!comments || !comments.length">
      <div v-if="loadingComment" class="spinner-border text-dark" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="text-danger" v-if="!loadingComment">
        O post não tem comentários
      </div>
    </div>
    <label for="comment" class="form-label mt-3">Adicionar comentário</label>
    <textarea 
      :title="!currentUser ? 'Usuário não logado' : ''"
      :disabled="!currentUser"
      :class="errors.body && 'is-invalid'"
      v-model="comment" rows="2"
      type="string"
      class="form-control"
      id="comment" 
    />
    <div v-if="errors.body" class="invalid-feedback">{{errors.body}}</div>
    <div class="col-12 d-flex justify-content-between align-items-center mt-3">
      <router-link class="btn btn-warning" to="/post">Voltar</router-link>
      <span :title="!currentUser ? 'Usuário não logado' : ''">
        <button
          :disabled="loadingComment || !currentUser" @click="newComment()"
          class="btn btn-secondary float-end mt-2"
        >
          {{ loadingComment ? 'Comentando' : 'Comentar'}}
        </button>
      </span >
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import userApi from "../../../api/user";
export default {
  data() {
    return {
      comment: '',
      inactiveUsers: []
    }
  },
  created() {
    this.getComments({ postId: this.postId });
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
    },
    userIsInactive(email) {
      return this.inactiveUsers.includes(email)
    },
    getInactiveUsers(email) {
      return userApi.getUsers({email})
        .then((data) => {
          const user = data.data[0]
          if (user?.status === 'inactive') {
            this.inactiveUsers.push(email);
          }
        })
        .catch((error) => {throw error});
    },
  },
  props: {
    postId: [Number, String],
  },
  watch: {
    comments(newValues) {
      if (newValues) {
        this.inactiveUsers = []
        newValues.forEach(({ email }) => {
          this.getInactiveUsers(email)
        });
      }
    }
  }
}
</script>

<style scoped>
  .body-post {
    text-align: justify;
  }
</style>
