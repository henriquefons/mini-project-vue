<template>
  <div class="hello">
    <h1 class="text-warning">{{ msg }}</h1>
    <button @click="editUser({ id: 1, data: { name: 'Joaquim Maria BR' }})"> Editar </button>
    <button @click="getUsers()"> Buscar </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    msg: String
  },
  computed: {
    ...mapGetters('user', ['user'])
  },
  methods: {
    ...mapActions('user', ['getUsers', 'editUser'])
  },
}
</script>

<style scoped>

</style>
