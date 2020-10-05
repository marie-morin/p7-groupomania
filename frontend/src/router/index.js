import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Landing",
    component: () => import("../views/Landing.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../views/Signup.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/profil/",
    name: "Profil",
    component: () => import("../views/Profil.vue"),
  },
  {
    path: "/post/:id",
    name: "Post",
    component: () => import("../views/PostPage.vue"),
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
