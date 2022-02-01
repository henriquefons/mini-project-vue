<template>
  <section>
    <div class="container">
      <div class="row mt-3" @input="onSearch" >
        <div class="d-flex justify-content-between">
          <h4 class="text-dark">Filtrar usuários</h4>
          <router-link class="btn btn-outline-primary" to="/user/new">Adicionar Usuário</router-link>
        </div>
        <div class="col-md-3 col-sm-6">
          <label for="name" class="form-label">Nome</label>
          <input v-model="formData.name" type="text" class="form-control" id="name" aria-describedby="name">
        </div>
        <div class="col-md-3 col-sm-6">
          <label for="email" class="form-label">Email</label>
          <input  v-model="formData.email" type="text" class="form-control" id="email" aria-describedby="email">
        </div>
        <div class="col-md-3 col-sm-6">
          <label for="gender" class="form-label">Genêro</label>
          <select v-model="formData.gender" required id="gender" class="form-select" aria-label="Selecione um genêro">
            <option selected value="">Filtrar por genêro</option>
            <option value="female">Feminino</option>
            <option value="male">Masculino</option>
          </select>
        </div>
        <div class="col-md-3 col-sm-6">
          <label for="status" class="form-label">Genêro</label>
          <select v-model="formData.status" required id="status" class="form-select" aria-label="Selecione um genêro">
            <option selected value="">Filtrar por Status</option>
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
          </select>
        </div>
      </div>
      <div class="row mt-3">
        <h4 class="text-dark">Listar usuários</h4>
        <div class="d-flex justify-content-center mt-5" v-if="loadingUser">
          <div class="spinner-border text-dark" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div class="col-12" v-if="user">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nome</th>
                <th scope="col">Email</th>
                <th scope="col">Genero</th>
                <th scope="col">Status</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="u in user" :key="u.id">
                <th scope="row">{{ u.id }}</th>
                <td>{{ u.name }}</td>
                <td>{{ u.email }}</td>
                <td>{{ u.gender === 'male' ? 'Masculino' : 'Feminino' }}</td>
                <td>{{ u.status === 'active' ? 'Ativo' : 'Inativo' }}</td>
                <td>
                  <router-link title="Editar usuário" class="btn-sm btn-outline-secondary" :to="`/user/edit/${u.id}`">
                    <i class="bi bi-pencil-fill"></i>
                  </router-link>
                  <a title="Logar com usuário" class="btn-sm btn-outline-success" @click="createCurrentUser(u)">
                    <i class="bi bi-box-arrow-right"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="overflow-auto">
            <b-pagination
              v-model="currentPage"
              :total-rows="10"
              :per-page="4"
              first-text="First"
              prev-text="Prev"
              next-text="Next"
              last-text="Last"
            ></b-pagination>
          </div>
        </div>
      </div>  
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      currentPage: '',
      timeout: null,
      formData: {
        name: '',
        email: '',
        gender: '',
        status: '',
      }
    }
  },
  created() {
    this.getUsers();
  },
  unmounted() {
    this.resetUserState();
  },
  computed: {
    ...mapGetters('user', ['loadingUser', 'user', 'pagination']),
  },
  methods: {
    ...mapActions('user', ['getUsers']),
    ...mapActions('storage', ['createCurrentUser']),
    ...mapMutations('user', ['resetUserState']),
    onSearch() {
      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.getUsers(this.formData)
      }, 700)
    },
  },
}
</script>

<style scoped>

</style>
