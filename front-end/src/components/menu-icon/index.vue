<template>
  <div class="container" @click="handleClick">
    <div :class="{'one-line-active': isCollapse}"></div>
    <div :class="{'two-line-active': isCollapse}"></div>
    <div :class="{'three-line-active': isCollapse}"></div>
  </div>
</template>

<script>
export default {
  name: "menu-icon",
  props: {
    active: Boolean
  },
  data() {
    return {
      isCollapse: this.active
    }
  },
  methods: {
    handleClick() {
      this.isCollapse = !this.isCollapse
      this.$emit('update:active', this.isCollapse)
      this.$emit('change', this.isCollapse)
    }
  }
};
</script>

<style scoped>
.container {
  width: 28px;
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.container div {
  width: 28px;
  height: 3px;
  background-color: gray;
  transition: 0.3s linear;
}
.container .one-line-active {
  transform: rotate(45deg) translate(4px, 8px);
}
.container .two-line-active {
  opacity: 0;
}
.container .three-line-active {
  transform: rotate(-45deg) translate(4px, -8px);
}
</style>
