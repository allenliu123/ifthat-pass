import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  // mode: "history",
  // base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "root",
      redirect: '/verify'
    },
    {
      path: "/verify",
      name: "verify",
      component: () => import('@/views/verify'),
    },
    {
      path: "/home",
      name: "home",
      component: () => import('@/views/home'),
    },
    {
      path: "/test",
      name: "test",
      component: () => import('@/views/test')
    },
    {
      path: '/test-menu-icon',
      name: 'menu-icon',
      component: () => import('@/views/test/menu-icon'),
    }
  ]
});
