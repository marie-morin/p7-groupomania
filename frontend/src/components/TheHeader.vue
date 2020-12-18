<script>
import { mapGetters } from "vuex";
import store from "../store";
import BaseAvatar from "@/components/BaseAvatar";

export default {
  name: "TheHeader",

  components: { BaseAvatar },

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

    <div class="header__welcome">
      <BaseAvatar :user="currentUser" origin="header" />
      <p>{{ currentUser.firstname }} {{ currentUser.lastname }}</p>
    </div>

    <nav class="header__nav">
      <router-link
        to="/home"
        class="header__link"
        :class="{ active : selectedPage == 'home' }"
      >
        <font-awesome-icon icon="home" @click="setActive('home')"/>
      </router-link> 

      <router-link
        to="/users"
        class="header__link"
        :class="{ active : selectedPage == 'users' }"
      >
        <font-awesome-icon icon="users" @click="setActive('users')"/>
      </router-link>

      <router-link
        :to="{ name: 'Profil', params: { id: currentUser.id } }"
        class="header__link"
        :class="{ active : selectedPage == 'profil' }"
      >
        <font-awesome-icon icon="user-circle" @click="setActive('profil')"/>
      </router-link>

      <a
        href="#"
        class="header__link"
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

  background-color: lighten($color: $primary-color, $amount: 10);
  color: $clear-color;

  @media screen and (max-width: $small) {
    @include flexbox(flex-start, column, center);
  }

  &__welcome {
    @include flexbox(flex-start, row, center);
  }

  &__nav {
    @include flexbox(space-between, row, center);

    @media screen and (max-width: $small) {
      margin-bottom: 1.5rem;
    }
  }

  &__link {
    width: 3.5rem;
    height: 3.5rem;
    @include flexbox(center, row, center);
    margin: 0 1.5rem;

    color: $clear-color;

    border-radius: $round-radius;

    font-size: 2.3rem;
    text-decoration: none;

    cursor: pointer;
    transition: all .2s;

    &:hover {
      transform: translateY(-0.3rem);
    }

    &:active {
      box-shadow: $shadow;
      transform: translateY(-0.1rem);
    }
  }
}

.active {
  box-shadow: $shadow;
  border-radius: $round-radius;
}
</style>
