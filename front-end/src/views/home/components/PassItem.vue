<template>
  <el-row class="item">
    <el-col :span="6">{{ pass.name }}</el-col>
    <el-col :span="6">{{ pass.username }}</el-col>
    <el-col :span="6">·······</el-col>
    <el-col :span="4">{{ pass.remark }}</el-col>
    <el-col :span="2" class="edit-icon">
      <i class="el-icon-edit-outline" @click="$emit('edit')"></i>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    value: Object
  },
  computed: {
    pass() {
      return this.value
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
.item {
  height: 48px;
  border-color: #46494e;
  background-color: white;
  padding: 8px 20px;
  margin: 8px 0;
  line-height: 32px;
  /* box-shadow: 3px 5px 10px #333; */
}
.edit-icon {
  font-size: 1.2em;
  cursor: pointer;
  text-align: right;
}
</style>
