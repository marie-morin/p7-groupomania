<script>
import store from "../store";
import { mapGetters } from "vuex";
import BaseAvatar from "@/components/BaseAvatar";
import BaseButton from "@/components/BaseButton";

export default {
  name: "TheHeader",

  components: { BaseAvatar, BaseButton },

  data() {
    return { selectedPage: null, }
  },

  computed: mapGetters(["currentUser"]),

  watch: {
    $route(to) {
      this.selectedPage = to.name;
    },
  },

  created() {
    this.selectedPage = this.$route.name
  },

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
    <div class="container header__content">
      
      <div class="header__welcome">
        <BaseAvatar :user="currentUser" origin="header" />
        <p>{{ currentUser.firstname }} {{ currentUser.lastname }}</p>
      </div>

      <nav class="header__nav">

        <BaseButton
          to="/home"
          tag="router-link"
          isNavBtn
          :class="{ active : selectedPage == 'Home' }"
          aria-label="Accueil"
        >
          <font-awesome-icon icon="home" />
        </BaseButton>

        <BaseButton
          to="/users"
          tag="router-link"
          isNavBtn
          :class="{ active : selectedPage == 'Users' }"
          aria-label="Utilisateurs"
        >
          <font-awesome-icon icon="users" />
        </BaseButton>
        
        <BaseButton
          :to="{ name: 'Profil', params: { id: currentUser.id } }"
          tag="router-link"
          isNavBtn
          :class="{ active : selectedPage == 'Profil' }"
          aria-label="Profil"
        >
          <font-awesome-icon icon="user-circle" />
        </BaseButton>

        <BaseButton
          @click.prevent="logout"
          tag="button"
          isNavBtn
          aria-label="Deconnexion"
        >
          <font-awesome-icon icon="power-off"/>
        </BaseButton>
      </nav>
    </div>
  </div>
</template>


<style scoped lang="scss">
.header {
  width: 100%;
  background-color: $primary-color;
  color: $clear-color;

  &__content {
    @include flexbox(space-between, row, center);

    @media screen and (max-width: $break-small) {
      @include flexbox(flex-start, column, center);
    }
  }

  &__welcome {
    @include flexbox(flex-start, row, center);
  }

  &__nav {
    @include flexbox(space-between, row, center);

    @media screen and (max-width: $break-small) {
      margin-bottom: 1.5rem;
    }
  }
}

.active {
  box-shadow: $shadow;
  border-radius: $round-radius;
}
</style>
