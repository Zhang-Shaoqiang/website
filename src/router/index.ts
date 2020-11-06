import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import BasicLayout from "@/layout/index.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: '/index',
    component: BasicLayout,
    children: [
      {
        path: 'index',
        name: '首页',
        component: () =>
          import(/* webpackChunkName: "home" */ "../views/Home.vue")
      },
      {
        path: "about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue")
      },
      {
        path: "report-forms",
        name: "ReportForms",
        component: () =>
          import(/* webpackChunkName: "report-forms" */ "../views/ReportForms.vue")
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
