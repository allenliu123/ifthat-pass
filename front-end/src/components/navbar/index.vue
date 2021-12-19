<template>
  <div class="navbar">
    <div class="nav-container">
      <el-image src="https://static.ifthat.com/public/data/556d0dbf4d32b66a-ifpass.png"></el-image>
      <div class="nav-name">ifpass</div>
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
  background-color: #78c7b1;
}
.navbar .nav-container {
  max-width: 1268px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;
  margin: 0 auto;
}
.navbar .el-image {
  width: 40px;
  height: 40px;
}
.navbar .nav-name {
  color: white;
  margin-left: 20px;
  margin-right: auto;
  font-size: 36px;
}
</style>
