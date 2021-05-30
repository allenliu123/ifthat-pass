import axios from "axios";
import NProgress from "nprogress";
// import store from "../store";
import router from '@/router'

const service = axios.create({
  timeout: 15000,
  async: true,
  crossDomain: true,
  withCredentials: true,
  xhrFields: {
    withCredentials: true
  }
});

// 添加拦截器
service.interceptors.request.use(
  config => {
    NProgress.start();
    // if (!store.getters.getToken) {
    //   router.replace({
    //     path: '/verify'
    //   });
    // }
    return config;
  },
  error => {
    NProgress.remove();
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    NProgress.done();
    if (response.status === 200) {
      if (response.data.code === -2 || response.data.code === -1) {
        console.log(window.location.hash)
        if (window.location.hash !== '#/verify') {
          router.push({
            path: '/verify'
          });
        }
      }
      return response;
    } else {
      return response;
    }
  }
);

export default service;
