<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view></router-view>
    <SetKeyDialog></SetKeyDialog>
  </div>
</template>

<script>
import Navbar from '@/components/navbar'
import SetKeyDialog from '@/components/SetKeyDialog'

export default {
  components: {
    Navbar,
    SetKeyDialog
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
