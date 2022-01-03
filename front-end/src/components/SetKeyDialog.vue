<template>
  <el-dialog
    title="输入解密密码"
    :visible="dialogVisible"
    @closed="handleClosed"
    width="30%">
    <el-input v-model="inputKey" placeholder="请输入内容"></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      dialogVisible: state => state.pass.setKeyVisible
    })
  },
  data() {
    return {
      inputKey: ''
    }
  },
  methods: {
    closeDialog() {
      this.$store.commit('pass/setVisible', false)
    },
    submit() {
      // submit
      if (this.inputKey) {
        this.$store.dispatch('pass/setKey', this.inputKey)
        this.closeDialog()
        this.$message.success('修改成功')
      } else {
        this.$message.info('请输入 key')
      }
    },
    handleClosed() {
      this.inputKey = ''
    }
  }
  // mounted() {
  //   setInterval(() => {
  //     console.log(this.$store.state.pass.setKeyVisible)
  //   }, 1000)
  // }
}
</script>