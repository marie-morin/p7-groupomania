import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";
import store from "../store";

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
    path: "/profil/:id",
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
    const now = Date.now();
    const jwtCreation = localStorage.getItem("jwtCreation");
    const sinceRegistration = now - jwtCreation;

    // Soit 24h = 86 400 000ms
    if (sinceRegistration > 86400000) {
      localStorage.clear();
      if (requiresAuth) {
        next({ name: "Landing" });
      } else {
        next();
      }
    } else {
      const options = {
        method: "POST",
        data: JSON.stringify(localStorage.getItem("jwt")),
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem("jwt").replace(/['"']+/g, ""),
        },
      };
      axios
        .post("http://localhost:3000/api/users/me", options)
        .then((response) => {
          if (!response.data) {
            if (requiresAuth) {
              next({ name: "Landing" });
            } else {
              next();
            }
          } else {
            store.commit("setUser", response.data);
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
  }
});

export default router;
