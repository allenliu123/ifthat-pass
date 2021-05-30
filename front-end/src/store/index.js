import Vue from "vue";
import Vuex from "vuex";
import Cookies from 'js-cookie'
import pass from './modules/pass'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    pass
  },
  state: {
    id: localStorage.getItem('id'),
    user: localStorage.getItem('user'),
    token: localStorage.getItem('access_token'),
    isLogin: false
  },
  getters: {
    getId: state => state.id || localStorage.getItem('id'),
    getUser: state => state.user || localStorage.getItem('user'),
    getToken: state => state.token || localStorage.getItem('access_token'),
    getIsLogin: state => state.isLogin
  },
  mutations: {
    setId (state, id) {
      state.id = id;
      localStorage.setItem('id', id)
    },
    setUser (state, user) {
      state.user = user;
      localStorage.setItem('user', user)
    },
    setToken (state, data) {
      state.token = data.accessToken
      Cookies.set('token', data.accessToken)
      localStorage.setItem('access_token', data.accessToken)
    },
    clearUser (state) {
      state.user = null;
    },
    setIsLogin(state, isLogin) {
      state.isLogin = isLogin
    }
  },
  actions: {},
  strict: process.env.NODE_ENV !== "production"
});
