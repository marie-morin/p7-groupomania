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
      title: "Bienvenue - Groupomania",
      requiresAuth: false,
    },
  },

  {
    path: "/signup",
    name: "Signup",
    component: () => import("../views/Signup.vue"),
    meta: {
      title: "Inscription - Groupomania",
      requiresAuth: false,
    },
  },

  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      title: "Connexion - Groupomania",
      requiresAuth: false,
    },
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      title: "Actualités - Groupomania",
      requiresAuth: true,
    },
  },
  {
    path: "/profil/:id",
    name: "Profil",
    component: () => import("../views/Profil.vue"),
    meta: {
      title: "Profil - Groupomania",
      requiresAuth: true,
    },
  },
  {
    path: "/users/",
    name: "Users",
    component: () => import("../views/Users.vue"),
    meta: {
      title: "Utilisateurs - Groupomania",
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

// Avant chaque route, verification de connexon de l'utilisateur en recherchant un token en localStrage :

// Si aucun token n'est trouvé dans le localStorage (utilisateur déconnecté) :
//    * si redirection vers une page publique, accès à la page recherchée
//    * si redirection vers une page privée, accès refusé, retour à la page Landing

// Si un token est trouvé dans le localStorage :
//    1. Vérifier l'ancienneté du token :
//          * si le token a plus de 24h : suppression du token et retour à la page Landing (utilisateur déconnecté)
//          * si le token a moins de 24h : Poursuite de la tentative d'accès à la page
//    2. Utilisation du token pour faire une requête d'authentification "me"
//          * si la réponse est régative (token obsolète), accès refusé, retour à la page Landing
//          * si la réponse est positive, accès à la page recherchée

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
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
        .post(process.env.VUE_APP_LOCALHOST_URL + "users/me", options)
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
