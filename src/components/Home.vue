<template>
  <section>
    <div class="container mt-3">
      <div class="row">
        <h4 class="text-dark">Bem vindo ao Blog</h4>
        <div v-if="!currentUser" class="alert alert-info mt-3" role="alert">
          Para criar Posts e acessar o TODO, favor entrar com um usuário
          <br>
          <router-link role="button" class="link-dark" :to="`/user`">
            Entrar com usuário
          </router-link>
        </div>
        <div v-if="currentUser" class="alert alert-success mt-3" role="alert">
          Olá {{currentUser.name}}, ir para:
          <br>
          <router-link role="button" class="link-dark" :to="`/post`">
            POSTS
          </router-link>
          <br>
          <router-link disabled role="button" class="link-dark" :to="`/TODO`">
            TODO
          </router-link>
        </div>
        <div v-if="currentUser?.status === 'inactive'" class="alert alert-warning mt-3" role="alert">
          Seu usuário está inativo, não é possivel realizar algumas ações!
          <br>
          <router-link role="button" class="link-dark" :to="`/user/edit/${currentUser.id}`">
            Editar usuário
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('storage', ['currentUser']),
  },
  methods: {
  },
}
</script>

<style scoped>

</style>
