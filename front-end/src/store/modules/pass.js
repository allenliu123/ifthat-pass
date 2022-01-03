import passApi from '@/apis/pass'
import aes from '@/utils/aes'
import { md5 } from '@/utils/aes'

export default {
  namespaced: true,
  state: () => ({
    passList: [],
    key: localStorage.getItem('key'), // absoietlj32fai13
    setKeyVisible: false // 设置 key 的弹窗
  }),

  mutations: {
    setPassList(state, passList) {
      state.passList = passList
    },
    setVisible(state, flag) {
      state.setKeyVisible = flag
    }
  },

  getters: {
    passStr(state) {
      return JSON.stringify(state.passList || [])
    }
  },

  actions: {
    async getDataFromRemote({ state, commit, rootGetters }) {
      if (!state.key) {
        console.log('key 不存在，打开设置 key 弹窗')
        commit('setVisible', true)
        return
      }
      let res = await passApi.getStr(rootGetters.getId).then()
      if (res.data.code === 200) {
        const decryptStr = aes.decrypt(res.data.data, state.key)
        console.log(decryptStr)
        if (decryptStr === 'decrypt error') {
          // 解密失败
          state.setKeyVisible = true
        } else {
          commit('setPassList', res.data.data ? JSON.parse(decryptStr) : [])
        }
      }
    },
    addData({commit, getters, dispatch }, passObj) {
      let lst = JSON.parse(getters.passStr)
      lst.push(passObj)
      commit('setPassList', lst)
      dispatch('saveToRemote')
    },
    deleteData({ state, commit, dispatch }, uuid) {
      let passList = state.passList
      let lst = passList.filter(item => item.uuid !== uuid)
      commit('setPassList', lst)
      dispatch('saveToRemote')
    },
    updateData({ commit, getters, dispatch }, passObj) {
      let passList = JSON.parse(getters.passStr)
      passList.forEach(item => {
        if (item.uuid === passObj.uuid) {
          item.name = passObj.name
          item.username = passObj.username || '',
          item.password = passObj.password || '',
          item.remark = passObj.remark || ''
        }
      })
      commit('setPassList', passList)
      dispatch('saveToRemote')
    },
    // 保存加密后的密码密文到服务器的数据库
    saveToRemote({state, getters, rootGetters }) {
      passApi.save(rootGetters.getId, aes.encrypt(getters.passStr, state.key))
    },
    setKey({ state, dispatch }, str) {
      const md5Str = md5(str)
      localStorage.setItem('key', md5Str)
      state.key = md5Str
      if (state.passList.length > 0) { // 更新 key
        dispatch('saveToRemote')
      }
      dispatch('getDataFromRemote')
    }
  }
}