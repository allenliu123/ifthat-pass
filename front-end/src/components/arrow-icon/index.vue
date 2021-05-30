<template>
  <div>
    <el-button>asdf</el-button>
    <i
      class="collapse-switch el-icon-back"
      :class="{'transform': isCollapse}"
      @click="isCollapse = !isCollapse"
    />
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      isCollapse: false
    };
  }
};
</script>

<style scoped>
.collapse-switch {
  padding: 20px;
  font-weight: bold;
  transition: transform 0.3s linear;
}
.transform {
  transform: rotate(180deg);
}
</style>
