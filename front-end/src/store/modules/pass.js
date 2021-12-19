import passApi from '@/apis/pass'
import aes from '@/utils/aes'

export default {
  namespaced: true,
  state: () => ({
    passList: []
  }),

  mutations: {
    setPassList(state, passList) {
      state.passList = passList
    }
  },

  getters: {
    passStr(state) {
      return JSON.stringify(state.passList || [])
    }
  },

  actions: {
    async getDataFromRemote({ commit, rootGetters }) {
      let res = await passApi.getStr(rootGetters.getId).then()
      if (res.data.code === 200) {
        commit('setPassList', res.data.data ? JSON.parse(aes.decrypt(res.data.data)) : [])
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
    // 保存加密后的密码密文到数据库
    saveToRemote({ getters, rootGetters }) {
      passApi.save(rootGetters.getId, aes.encrypt(getters.passStr))
    }
  }
}