<template>
  <div class="layout">
    <div style="text-align: right;">
      <el-button icon="el-icon-plus" @click="add"></el-button>
    </div>
    <div v-for="item in passData" :key="item.uuid">
      <PassItem :value="item" @edit="edit(item)"></PassItem>
    </div>
    <Drawer
      :visible.sync="drawer"
      :type="type"
      :data="drawerData"
      @del="del"
    ></Drawer>
  </div>
</template>

<script>
import Drawer from './components/Drawer'
import PassItem from './components/PassItem'
import { mapState, mapActions } from 'vuex'
import uuid from '@/utils/uuid'

export default {
  components: { Drawer, PassItem },
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
      this.$confirm(`确认删除${data.name}？`).then(() => {
        this.deleteData(data.uuid)
        this.drawer = false
      })
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
  max-width: 1268px;
  margin: 16px auto;
  padding: 0 16px;
}
</style>