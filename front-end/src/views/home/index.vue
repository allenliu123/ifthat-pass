<template>
  <div class="layout">
    <el-table
      :data="passData"
      v-loading='loading'>
      <el-table-column
        prop="name"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
          <el-button size="mini" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <el-button @click="add">新增</el-button>

    <Drawer :visible.sync="drawer" :type="type" :data="drawerData"></Drawer>

  </div>
</template>

<script>
import Drawer from './Drawer'
import { mapState, mapActions } from 'vuex'
import uuid from '@/utils/uuid'

export default {
  components: { Drawer },
  data() {
    return {
      loading: false,
      drawer: false,
      type: '', // add or edit
      drawerData: {
        uuid: '',
        name: '',
        username: '',
        password: '',
        remark: ''
      }
    }
  },
  mounted() {
    if (this.$store.getters.getId) {
      this.$store.dispatch('pass/getDataFromRemote', this.$store.getters.getId)
    }
  },
  computed: {
    ...mapState({
      passData: state => state.pass.passList
    })
  },
  methods: {
    ...mapActions({
      deleteData: 'pass/deleteData'
    }),
    // getUser() {
    //   // console.log(this.$store.getters.getUser)
    //   this.user = this.$store.getters.getUser
    // },
    // getPassStr() {
    //   this.loading = true
    //   let id = this.$store.getters.getId
    //   this.$api.passApi.getStr(id).then(res => {
    //     if (res.data.code !== 200) {
    //       return
    //     }
    //     this.passObj = JSON.parse(res.data.data)
    //     localStorage.setItem('passStr', JSON.stringify(this.passObj))
    //     this.loading = false
    //   })
    // },
    edit(data) {
      this.type = 'edit'
      this.drawerData = {
        uuid: data.uuid || '',
        name: data.name || '',
        username: data.username || '',
        password: data.password || '',
        remark: data.remark || ''
      }
      this.drawer = true
    },
    del(data) {
      this.deleteData(data.uuid)
    },
    add() {
      this.type = 'add'
      this.drawerData = {
        uuid: uuid(),
        name: '',
        username: '',
        password: '',
        remark: ''
      }
      this.drawer = true
    }
  }
}
</script>

<style scoped>
.layout {
  width: 1000px;
  margin: 20px auto;
}
</style>