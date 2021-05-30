<template>
  <div>
    <menu-icon :active.sync="isOpen" @change="handleChange"></menu-icon>
  </div>
</template>

<script>
import MenuIcon from '@/components/menu-icon'

export default {
  components: { MenuIcon },
  data() {
    return {
      isOpen: true
    }
  },
  mounted() {
    this.$api.fileApi.upload().then(res => {
      console.log(res)
    })
  },
  methods: {
    handleChange(value) {
      console.log(value)
    }
  }
}
</script>