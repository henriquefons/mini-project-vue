<template>
  <section>
    <div class="container">
      <div v-if="currentUser.status === 'inactive'" class="alert alert-warning mt-3" role="alert">
        O usuário está inativo, não é possivel criar post!
        <br>
        <router-link role="button" class="link-dark" :to="`/user/edit/${currentUser.id}`">
          Editar usuário
        </router-link>
      </div>
      <form @submit.prevent="onSubmit" v-if="currentUser">
        <h4 class="text-dark m-3">Novo Post</h4>
        <div class="col-sm-12">
          <label for="title" class="form-label">Título</label>
          <input :disabled="currentUser.status === 'inactive'" required :class="errors.title && 'is-invalid'" v-model="formData.title" type="text" class="form-control" id="title">
          <div v-if="errors.title" class="invalid-feedback">{{errors.title}}</div>
        </div>
        <div class="col-sm-12 mt-2">
          <label for="body" class="form-label">Texto</label>
          <textarea :disabled="currentUser.status === 'inactive'" required :class="errors.body && 'is-invalid'" v-model="formData.body" rows="3" type="string" class="form-control" id="body" />
          <div v-if="errors.body" class="invalid-feedback">{{errors.body}}</div>
        </div>
        <div v-if="post" class="alert alert-success mt-3" role="alert">
          Post salvo com sucesso!
          <br>
          <router-link role="button" class="link-success" :to="`/post/${post.id}`">
            Ver meu Post
          </router-link>
        </div>
        <div class="col-12 d-flex justify-content-between mt-3">
          <router-link class="btn btn-danger" to="/post">Cancelar</router-link>
          <button :disabled="loadingPost || currentUser.status === 'inactive'" type="submit" class="btn btn-success">
            {{ loadingPost ? 'Salvando' : 'Salvar' }}
          </button>
        </div>
      </form>
      <div v-if="!currentUser" class="alert alert-danger mt-3" role="alert">
        Usuário não encontrado!
        <br>
        <router-link role="button" class="link-dark" :to="`/user`">
          Entrar com usuário
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  data() {
    return {
      formData: {
        title: '',
        body: '',
      }
    }
  },
  unmounted() {
    this.resetPostState();
  },
  computed: {
    ...mapGetters('post', ['loadingPost', 'post', 'errorPost']),
    ...mapGetters('storage', ['currentUser']),
    errors() {
      if (!this.errorPost) return {};
      // converte o array em um objeto
      const error = this.errorPost.reduce((acc, { field, message }) => {
        acc[field] = message;
        return acc;
      }, {})
      return error;
    },
  },
  methods: {
    ...mapMutations('post', ['resetPostState']),
    ...mapActions('post', ['createPost']),
    onSubmit() {
      const data = {
        ...this.formData,
        user_id: this.currentUser.id,
      }
      this.createPost(data)
    },
  },
  watch: {
    'post.id'(newValue) {
      if(newValue) alert('Post salvo com suceso!')
    }
  }
}
</script>

<style scoped>
  .body-post {
    text-align: justify;
  }
</style>
