import passApi from '@/apis/pass'

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
        commit('setPassList', JSON.parse(res.data.data))
      }
    },
    addData({commit, getters, rootGetters }, passObj) {
      let lst = JSON.parse(getters.passStr)
      lst.push(passObj)
      commit('setPassList', lst)
      passApi.save(rootGetters.getId, getters.passStr)
    },
    deleteData({ state, commit, getters, rootGetters }, uuid) {
      let passList = state.passList
      let lst = passList.filter(item => item.uuid !== uuid)
      commit('setPassList', lst)
      passApi.save(rootGetters.getId, getters.passStr)
    },
    updateData({ commit, getters, rootGetters }, passObj) {
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
      passApi.save(rootGetters.getId, getters.passStr)
    },
  }
}