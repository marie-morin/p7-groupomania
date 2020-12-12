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
    <v-avatar
      class="mr-10"
      color="grey darken-1"
      size="32"
      v-if="currentUser.id"
    ></v-avatar>

    <!-- <p v-if="currentUser.id">
      Bonjour
      <span>{{ currentUser.firstname }}</span>
    </p> -->

    <v-btn text>
      <router-link v-if="currentUser.id" to="/home">Accueil</router-link> 
    </v-btn>

    <v-btn text>
      <router-link v-if="currentUser.id" to="/users">Utilisateurs</router-link>   
    </v-btn>

    <v-btn text>
      <router-link
        v-if="currentUser.id"
        :to="{ name: 'Profil', params: { id: currentUser.id } }"
      >
        Profil
      </router-link>
    </v-btn>

    <v-btn text>
      <a v-if="currentUser.id" href="#" @click.prevent="logout">
        Déconnexion
      </a>
    </v-btn>
  </div>
</template>

<style scoped lang="scss">
// .header {
//   width: 100vw;
//   min-width: 150px;
//   height: 10vh;
//   @include flexbox(center);
//   background-color: rgb(15, 27, 50);
//   @media screen and (max-width: $x-small) {
//     height: 15vh;
//   }
// }

// .inner {
//   width: 60%;
//   margin: 0 auto;
//   @include flexbox(space-between);

//   @media screen and (max-width: $large + 200) {
//     width: 80%;
//   }
//   @media screen and (max-width: $medium - 200) {
//     // @include flexbox(space-between, column);
//     @include flexbox(center, column);
//   }
// }

// .logo {
//   width: 20%;
//   margin: 20px 0;
//   min-width: 180px;
//   @media screen and (max-width: $medium - 200) {
//     // @include flexbox(space-between, column);
//     margin: 10px 0;
//   }
// }

// #nav {
//   a {
//     font-size: 20px;
//     font-weight: 500;
//     padding-left: 30px;
//     text-decoration: none;
//     color: white;

//     &:hover {
//       color: $groupomania-red;
//     }
//   }

//   @media screen and (max-width: $x-small) {
//     @include flexbox(center, column);
//   }
// }
</style>
