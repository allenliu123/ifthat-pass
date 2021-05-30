<template>
  <div>
    <div v-if="!isLogin" @click="toLogin">
      <button>请先登录</button>
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
  mounted() {
    this.verify()
  },
  computed: mapState(['isLogin']),
  methods: {
    verify() {
      let accessToken = localStorage.getItem('access_token')
      if (!accessToken) {
        this.$store.commit('setIsLogin', false)
        return
      }
      this.$api.loginApi.verify({ token: accessToken }).then(res => {
        if (res.data.code === 200) {
          this.$store.commit('setIsLogin', true)
          this.$store.commit('setId', res.data.data.id)
          this.$store.commit('setUser', res.data.data.username)
          this.toHome()
        } else if (res.data.code === -1) {
          // token 错误
          this.$store.commit('setIsLogin', false)
        } else if (res.data.code === -2) {
          // 登录过期
          this.refreshToken()
        }
      })
    },
    toLogin() {
      let newWin=window.open('https://ifthat.com/login/', '', "width=600,height=400,top=300,left=400"); // 打开新的窗口对象
      let that = this
      window.addEventListener('message', function(e) {
        let data = JSON.parse(e.data)
        that.$store.commit('setToken', data)
        localStorage.setItem('refresh_token', data.refreshToken)
        newWin.close()
        location.reload()
      }, false);
    },
    toHome() {
      this.$router.push({ name: 'home' })
    },
    refreshToken() {
      let refreshToken = localStorage.getItem('refresh_token')
      this.$api.loginApi.refreshToken(refreshToken).then(({ data }) => {
        this.$store.commit('setToken', data.data)
        this.verify()
      })
    }
  }
}
</script>
