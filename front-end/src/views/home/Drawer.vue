<template>
  <el-drawer
    :with-header="false"
    :visible.sync="drawerVisible"
    direction="rtl"
    size="450px">
    <div class="form-body">
      <el-form v-model="form">
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">{{ type === 'add' ? '新增' : '保存'}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    visible: Boolean,
    data: Object,
    type: String
  },
  data() {
    return {
      form: this.data
    }
  },
  computed: {
    ...mapGetters(['getId']),
    drawerVisible: {
      get() {
        return this.visible
      },
      set(e) {
        this.$emit('update:visible', e)
      }
    }
  },
  watch: {
    data(newValue) {
      this.form = newValue
    } 
  },
  methods: {
    ...mapActions({
      addData: 'pass/addData', // 将 `this.addData()` 映射为 `this.$store.commit('pass/addData')`
      updateData: 'pass/updateData'
    }),
    submit() {
      if (this.type === 'add') {
        this.addData(this.form)
        this.drawerVisible = false
        // let id = this.getId
        // let passStr = localStorage.getItem('passStr')
        // let passObj = JSON.parse(passStr)
        // passObj.push(this.form)
        // passStr = JSON.stringify(passObj)
        // localStorage.setItem('passStr', passStr)
        // this.$api.passApi.save(id, passStr).then(res => {
        //   if (res.code === 200) {
        //     this.$message.success(res.message)
        //     this.drawerVisible = false
        //   }
        // })
      } else if (this.type === 'edit') {
        this.updateData(this.form)
        this.drawerVisible = false
      }
    }
  }
}
</script>

<style scoped>
.form-body {
  padding: 20px;
}
</style>
