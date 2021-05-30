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
      isOpen: false
    }
  },
  methods: {
    handleChange(value) {
      console.log(value)
    }
  }
}
</script>