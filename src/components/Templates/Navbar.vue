<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link class="navbar-brand" to="/">Página Inicial</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav nav-links">
          <li class="nav-item">
            <router-link class="nav-link" to="/todo">TODO</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/post">Postagens</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/user">Usuários</router-link>
          </li>
          <div class="w-100">Flex item</div>
          <li class="nav-item d-flex" v-if="currentUser">
            <a class="nav-link text-danger text-nowrap">{{currentUser.name}}</a>
            <a role="button" class="nav-link text-danger" @click.prevent="logout">
              <i title="Sair com usuário" class="bi bi-box-arrow-left"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav> 
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
  export default {
    computed: {
      ...mapGetters('storage', ['currentUser']),
    },
    methods: {
      ...mapMutations('storage', ['setCurrentUser']),
      logout() {
        this.setCurrentUser(null);
        localStorage.removeItem('current-user-blog')
      }
    }
  }
</script>

<style scoped>
  .nav-links {
    width: 100%;
  }
</style>
