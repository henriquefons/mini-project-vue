<template>
  <section>
    <div class="container">
      <form @submit.prevent="onSubmit">
        <div class="row mt-3 new-user-form">
          <h4 class="text-dark m-0">Novo usuário</h4>
          <div class="col-md-6 col-sm-12">
            <label for="name" class="form-label">Nome</label>
            <input :class="errors.name && 'is-invalid'"  v-model="formData.name" required type="text" class="form-control" id="name" aria-describedby="name">
            <div v-if="errors.name" class="invalid-feedback">{{errors.name}}</div>
          </div>
          <div class="col-md-6 col-sm-12">
            <label for="email" class="form-label">Email</label>
            <input :class="errors.email && 'is-invalid'" v-model="formData.email" required type="text" class="form-control" id="email" aria-describedby="email">
            <div v-if="errors.email" class="invalid-feedback">{{errors.email}}</div>
          </div>
          <div class="col-md-6 col-sm-12">
            <label for="gender" class="form-label">Genêro</label>
            <select :class="errors.gender && 'is-invalid'"  v-model="formData.gender" required id="gender" class="form-select" aria-label="Selecione um genêro">
              <option selected disabled value="">Selecione um genêro</option>
              <option value="female">Feminino</option>
              <option value="male">Masculino</option>
            </select>
            <div v-if="errors.gender" class="invalid-feedback">{{errors.gender}}</div>
          </div>
          <div class="col-md-6 col-sm-12">
            <label class="form-check-label" for="status">Status</label>
            <div class="form-check form-switch my-3">
              <input :class="errors.status && 'is-invalid'"  v-model="formData.status" class="form-check-input" type="checkbox" role="switch" id="status" checked>
              <label class="form-check-label" for="status">{{ formData.status ? 'Ativo' : 'Inativo'}}</label>
            </div>
            <div v-if="errors.status" class="invalid-feedback">{{errors.status}}</div>
          </div>
          <div v-if="user" class="alert alert-success" role="alert">
            Usuário salvo com sucesso!
          </div>
          <div class="col-12 d-flex justify-content-between mt-3">
            <router-link class="btn btn-danger" to="/user/new">Cancelar</router-link>
            <button :disabled="loadingUser" type="submit" class="btn btn-success">
              {{ loadingUser ? 'Salvando' : 'Salvar' }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        gender: '',
        status: true,
      }
    }
  },
  unmounted() {
    this.resetUserState();
  },
  computed: {
    ...mapGetters('user', ['loadingUser', 'errorUser', 'user']),
    errors() {
      if (!this.errorUser) return {};
      // converte o array em um objeto
      const error = this.errorUser.reduce((acc, { field, message }) => {
        acc[field] = message;
        return acc;
      }, {})
      return error;
    }
  },
  methods: {
    ...mapActions('user', ['createUser']),
    ...mapMutations('user', ['resetUserState']),
    onSubmit() {
      const data = { ...this.formData, status: this.formData.status ? 'active' : 'inactive' };
      console.log(data);
      this.createUser(data);
    },
  },
}
</script>

<style scoped>
  .new-user-form > div {
    margin-top: 10px;
  }
</style>
