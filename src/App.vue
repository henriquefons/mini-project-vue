<template>
  <Navbar />
  <HelloWorld msg="Hello Word My Friend"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
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
