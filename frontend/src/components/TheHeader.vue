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
    <p v-if="currentUser.id">
      Bonjour
      <span>{{ currentUser.firstname }}</span>
    </p>
    <router-link v-if="currentUser.id" to="/home">Accueil</router-link> 
    <router-link v-if="currentUser.id" to="/users">Utilisateurs</router-link>   
    <router-link
      v-if="currentUser.id"
      :to="{ name: 'Profil', params: { id: currentUser.id } }"
    >
      Profil
    </router-link>

    <a v-if="currentUser.id" href="#" @click.prevent="logout">
      Déconnexion
    </a>
  </div>
</template>

<style scoped lang="scss">
</style>
