<script>
import { mapGetters } from "vuex";
import store from "../store";

export default {
  name: "TheHeader",

  data() {
    return {
      selectedPage: 'home',
    }
  },

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

    setActive(page) {
      this.selectedPage = page;
    }
  },
};
</script>

<template>
  <div class="header">

    <div class="welcome">
      <img :src="currentUser.imageUrl" alt="currentUser.username" class="welcome__image">

      <p>Bonjour {{ currentUser.firstname }}</p>
    </div>

    <nav class="nav">
      <router-link
        to="/home"
        class="nav__unit"
        :class="{ active : selectedPage == 'home' }"
      >
        <font-awesome-icon icon="home" @click="setActive('home')"/>
      </router-link> 

      <router-link
        to="/users"
        class="nav__unit"
        :class="{ active : selectedPage == 'users' }"
      >
        <font-awesome-icon icon="users" @click="setActive('users')"/>
      </router-link>

      <router-link
        :to="{ name: 'Profil', params: { id: currentUser.id } }"
        class="nav__unit"
        :class="{ active : selectedPage == 'profil' }"
      >
        <font-awesome-icon icon="user-circle" @click="setActive('profil')"/>
      </router-link>

      <a
        href="#"
        class="nav__unit"
        @click.prevent="logout"
      >
        <font-awesome-icon icon="power-off" />
      </a>
    </nav>

  </div>
</template>

<style scoped lang="scss">
.header {
  width: 100%;
  @include flexbox(space-around, row, center);
  background-color: $groupomania-red;
  color: $groupomania-police;

  @media screen and (max-width: $small) {
    @include flexbox(flex-start, column, center);
  }
}

.welcome {
  @include flexbox(flex-start, row, center);

  &__image {
    width: 35px;
    height: 35px;
    margin-right: 10px;
    border-radius: 50%;
  }
}

.nav {
  @include flexbox(space-between, row, center);

  @media screen and (max-width: $small) {
   margin-bottom: 15px;
  }
  
  &__unit {
    @include flexbox(center, row, center);
    width: 35px;
    height: 35px;
    margin: 0 15px;
    border-radius: 50%;
    text-decoration: none;
    font-size: 1.3rem;
    color: $groupomania-police;
    cursor: pointer;
    transition: all .2s;

    &:hover {
      transform: translateY(-3px);
    }

    &:active {
      transform: translateY(-1px);
    }

    &--active {
      box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
    }
  }
}
.active {
  border-radius: 50%;
  box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
}
</style>
