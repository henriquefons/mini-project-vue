<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link class="navbar-brand" to="/">Página Inicial</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/todo">TODO</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/post">Postagens</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/user">Usuários</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled">Disabled</a>
          </li>
        </ul>
      </div>
    </div>
  </nav> 
</template>

<script>
  export default {
    props: {
    },
    computed: {
    },
    methods: {
    },
  }
</script>

<style scoped>

</style>
