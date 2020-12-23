<script>
import { mapActions, mapGetters } from "vuex";
import InfosUser from "@/components/InfosUser";
import BasePost from "@/components/BasePost";

export default {
  name: "Profil",

  components: { InfosUser, BasePost },

  data() {
    return {
      isOwner: false,
      isAdmin: false,
    };
  },

  computed: {
    ...mapGetters(["currentUser", "guest", "allPosts"]),

    // Filtrage des posts publiés par l'utilisateur de la page profil actuelle
    posts() { return this.$store.state.postModule.posts.filter((post) => post.userId == this.$route.params.id) },
  },

  watch: {
    $route(to) {
      // Mise ajour des informations du profil lors d'une redirection de profil à profil
      const guestOptions = {
        url: process.env.VUE_APP_LOCALHOST_URL + `users/${to.params.id}`,
        mutation: "setGuest",
      };
      this.fetch(guestOptions);

      if (this.currentUser.isAdmin == true) {
        this.isAdmin = true;
      }
      if (this.currentUser.id == this.$route.params.id) {
        this.isOwner = true;
      }
    },
  },

  created() {
    // Récupération des tous les posts
    const postsOptions = {
      url: process.env.VUE_APP_LOCALHOST_URL + "posts",
      mutation: "setPosts",
    };
    this.fetch(postsOptions);

    // Récupération du profil de l'utilisateur de la page actuelle
    const guestOptions = {
      url: process.env.VUE_APP_LOCALHOST_URL + `users/${this.$route.params.id}`,
      mutation: "setGuest",
    };
    this.fetch(guestOptions);

    if (this.currentUser.isAdmin == true) {
      this.isAdmin = true;
    }
    if (this.currentUser.id == this.$route.params.id) {
      this.isOwner = true;
    }
  },

  methods: mapActions(["fetch"]),
};
</script>


<template>
  <div class="profil container">
    <InfosUser v-if="isOwner" :is-owner="isOwner" :user="currentUser" />
    <InfosUser v-else :is-owner="isOwner" :user="guest" />

    <div v-for="post in posts" :key="post.id">
      <BasePost :post="post" />
    </div>
  </div>
</template>


<style scope lang="scss">
.profil {
  position: relative;
}
</style>