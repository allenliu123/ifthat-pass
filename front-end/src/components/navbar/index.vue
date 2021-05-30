<template>
  <div class="navbar">
    <div>
      <el-image src="https://ifthat.com/img/logo.png"></el-image>
    </div>
    <div>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ isLogin ? user : '请登录' }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
    }
  },
  computed: mapState(['user', 'isLogin'])
}
</script>

<style scoped>
.navbar {
  height: 60px;
  background-color: lightblue;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;
}
.navbar .el-image {
  width: 40px;
}
</style>
