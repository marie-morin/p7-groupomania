<template>
  <div class="header">
    <div class="inner">
      <img src="../../public/images/icon-white.png" alt="Logo" class="logo" />
      <div id="nav">
        <router-link v-if="currentUser.id" to="/home">Accueil</router-link>
        <router-link v-if="currentUser.id" to="/users">Utilisateurs</router-link>
        <router-link v-if="currentUser.id" :to="{ name: 'Profil', params: { id: currentUser.id }}">Profil</router-link>
        <a v-if="currentUser.id" href="#" @click.prevent="logout">Déconnexion</a>
        <p v-if="currentUser.id">Bonjour <span>{{ currentUser.firstname }}</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import store from "../store";

export default {
  name: "Header",

  computed: { 
    ...mapGetters(['currentUser']),
  },

  methods: {
    logout: function() {
      localStorage.clear();
      store.commit("userLogout");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped lang="scss">
.header {
  width: 100vw;
  min-width: 150px;
  height: 10vh;
  @include flexbox(center);
  background-color: rgb(15, 27, 50);
  @media screen and (max-width: $x-small) {
    height: 15vh;
  }
}

.inner {
  width: 60%;
  margin: 0 auto;
  @include flexbox(space-between);

  @media screen and (max-width: $large + 200) {
    width: 80%;
  }
  @media screen and (max-width: $medium - 200) {
    // @include flexbox(space-between, column);
    @include flexbox(center, column);
  }
}

.logo {
  width: 20%;
  margin: 20px 0;
  min-width: 180px;
  @media screen and (max-width: $medium - 200) {
    // @include flexbox(space-between, column);
    margin: 10px 0;
  }
}

#nav {
  a {
    font-size: 20px;
    font-weight: 500;
    padding-left: 30px;
    text-decoration: none;
    color: white;

    &:hover {
      color: $groupomania-red;
    }
  }

  @media screen and (max-width: $x-small) {
    @include flexbox(center, column);
  }
}
</style>
