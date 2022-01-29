<template>
  <Navbar />
  <router-view />
</template>

<script>
import Navbar from './components/Templates/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
</style>
