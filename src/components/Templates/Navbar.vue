<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link class="navbar-brand" to="/">Página Inicial</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav nav-links">
          <li class="nav-item" :title="!currentUser && 'Usuário não logado'" @click="!currentUser && warning()">
            <router-link :class="!currentUser && 'disabled'" class="nav-link" to="/todo">
              TODO
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/post">
              Postagens
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/user">Usuários</router-link>
          </li>
          <div class="w-100">Flex item</div>
          <li class="nav-item d-flex" v-if="currentUser">
            <router-link role="button" :to="`/user/edit/${currentUser.id}`" class="nav-link text-danger text-nowrap">{{currentUser.name}}</router-link>
            <a role="button" class="nav-link text-danger" @click.prevent="logout">
              <i title="Logout" class="bi bi-box-arrow-left"></i>
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
      },
      warning() {
        alert('Escolha um usuário para continuar')
      }
    }
  }
</script>

<style scoped>
  .nav-links {
    width: 100%;
  }
</style>
