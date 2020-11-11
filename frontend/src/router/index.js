import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Landing",
    component: () => import("../views/Landing.vue"),
    meta: {
      requiresAuth: false,
    },
  },

  {
    path: "/signup",
    name: "Signup",
    component: () => import("../views/Signup.vue"),
    meta: {
      requiresAuth: false,
    },
  },

  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/profil/",
    name: "Profil",
    component: () => import("../views/Profil.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/users/",
    name: "Users",
    component: () => import("../views/Users.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (!localStorage.getItem("jwt")) {
    if (requiresAuth) {
      next({ name: "Landing" });
    } else {
      next();
    }
  } else {
    axios
      .post("http://localhost:3000/api/users/me", {
        method: "POST",
        token: localStorage.getItem("jwt"),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then((response) => {
        if (!response.data.user) {
          if (requiresAuth) {
            next({ name: "Landing" });
          } else {
            next();
          }
        } else {
          if (requiresAuth) {
            next();
          } else {
            next({ name: "Home" });
          }
        }
      })
      .catch(() => {
        if (requiresAuth) {
          next({ name: "Landing" });
        } else {
          next();
        }
      });
  }
});

export default router;
