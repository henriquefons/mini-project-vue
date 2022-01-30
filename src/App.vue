<template>
  <Navbar />
  <router-view />
</template>

<script>
import { mapActions } from 'vuex';
import Navbar from './components/Templates/Navbar.vue'

export default {
  name: 'App',
  created() {
    this.getCurrentUser();
  },
  methods: {
    ...mapActions('storage', ['createCurrentUser']),
    getCurrentUser() {
      const currentUser = JSON.parse(localStorage.getItem('current-user-blog'));
      if (currentUser) this.createCurrentUser(currentUser);
    },
  },
  components: {
    Navbar
  },
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
</style>
