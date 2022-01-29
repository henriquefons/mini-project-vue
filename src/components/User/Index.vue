<template>
  <section>
    <div class="container">
      <div class="row mt-3">
        <div class="d-flex justify-content-between">
          <h4 class="text-dark">Filtrar usuários</h4>
          <router-link class="btn btn-outline-primary" to="/user/new">Adicionar Usuário</router-link>
        </div>
        <div class="col-md-3 col-sm-6">
          <label for="name" class="form-label">Nome</label>
          <input type="text" class="form-control" id="name" aria-describedby="name">
        </div>
        <div class="col-md-3 col-sm-6">
          <label for="email" class="form-label">Email</label>
          <input type="text" class="form-control" id="email" aria-describedby="email">
        </div>
        <div class="col-md-3 col-sm-6">
          <label for="gender" class="form-label">Genêro</label>
          <input type="text" class="form-control" id="gender" aria-describedby="gender">
        </div>
        <div class="col-md-3 col-sm-6">
          <label for="status" class="form-label">Status</label>
          <input type="text" class="form-control" id="status" aria-describedby="status">
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
                <td>{{ u.gender }}</td>
                <td>{{ u.status === 'active' ? 'Ativo' : 'Inativo' }}</td>
                <td>
                  <router-link class="btn-sm btn-outline-Primary" :to="`/user/new/${u.id}`">
                    <i class="bi bi-pencil-fill"></i>
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>  
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  props: {
    msg: String
  },
  created() {
    this.getUsers();
  },
  unmounted() {
    this.resetUserState();
  },
  computed: {
    ...mapGetters('user', ['loadingUser', 'user']),
  },
  methods: {
    ...mapActions('user', ['getUsers']),
    ...mapMutations('user', ['resetUserState']),
  },
}
</script>

<style scoped>

</style>
