<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/navbar'

export default {
  components: {
    Navbar
  },
  name: 'App'
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #efefef;
}
</style>
