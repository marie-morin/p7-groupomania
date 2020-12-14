<script>
import { mapGetters } from "vuex";
import store from "../store";

export default {
  name: "TheHeader",

  computed: { ...mapGetters(["currentUser"]) },

  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/");
      store.commit("removeUser");
      store.commit("removeUsers");
      store.commit("removeGuest");
      store.commit("removePosts");
    },
  },
};
</script>

<template>
  <div class="header">
    <p>Bonjour {{ currentUser.firstname }}</p>
    <router-link to="/home">Accueil</router-link> 
    <router-link to="/users">Utilisateurs</router-link>   
    <router-link :to="{ name: 'Profil', params: { id: currentUser.id } }">
      Profil
    </router-link>
    <a href="#" @click.prevent="logout">Déconnexion</a>
  </div>
</template>

<style scoped lang="scss">
.header {
  background-color: chocolate;
}
</style>
