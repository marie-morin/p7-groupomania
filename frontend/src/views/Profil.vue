<script>
import { mapActions, mapGetters } from "vuex";
import InfosUser from "@/components/InfosUser";
import FormProfilUpdate from "@/components/FormProfilUpdate";
import FormPasswordUpdate from "@/components/FormPasswordUpdate";
import BasePost from "@/components/BasePost";
import BaseButton from "@/components/BaseButton";

export default {
  name: "Profil",

  components: {
    InfosUser,
    FormProfilUpdate,
    FormPasswordUpdate,
    BasePost,
    BaseButton,
  },

  data() {
    return {
      isOwner: false,
      isAdmin: false,
      profilFormDisplayed: false,
      passwordFormDisplayed: false,
    };
  },

  computed: {
    ...mapGetters(["currentUser", "guest", "allPosts"]),

    posts() {
      return this.$store.state.postModule.posts.filter(
        (post) => post.userId == this.$route.params.id
      );
    },
  },

  watch: {
    $route(to) {
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
    // Chargement de tous les posts
    const postsOptions = {
      url: process.env.VUE_APP_LOCALHOST_URL + "posts",
      mutation: "setPosts",
    };
    this.fetch(postsOptions);

    // Chargement du profil guest
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

  methods: {
    ...mapActions(["fetch"]),

    deleteProfil() {
      const contexte = {
        origin: "deleteProfil",
        intention: "confirmation",
        message: "Voulez-vous vraiment supprimer votre compte ?",
        options: {
          url:
            process.env.VUE_APP_LOCALHOST_URL +
            `users/${this.$route.params.id}`,
          mutation: "removeUser",
          id: this.$route.params.id,
        },
      };
      this.$store.commit("displayPopup", contexte);
    },

    displayProfilForm() {
      return (this.profilFormDisplayed = !this.profilFormDisplayed);
    },

    displayPasswordFrom() {
      return (this.passwordFormDisplayed = !this.passwordFormDisplayed);
    },
  },
};
</script>

<template>
  <div class="profil">
    <InfosUser v-if="isOwner" :is-owner="isOwner" :user="currentUser" />
    <InfosUser v-else :is-owner="isOwner" :user="guest" />

    <BaseButton v-if="isOwner" :onClick="displayProfilForm">
      Modifier mon profil
    </BaseButton>
    <FormProfilUpdate
      v-if="isOwner"
      v-show="profilFormDisplayed"
      @display-form="displayProfilForm()"
    />

    <BaseButton v-if="isOwner" :onClick="displayPasswordFrom">
      Modifier mon mot de passe
    </BaseButton>
    <FormPasswordUpdate
      v-if="isOwner"
      v-show="passwordFormDisplayed"
      @display-form="displayPasswordFrom()"
    />

    <BaseButton v-if="isOwner || isAdmin" :onClick="deleteProfil">
      Supprimer le profil
    </BaseButton>

    <div v-for="post in posts" :key="post.id" class="post">
      <BasePost :post="post" />
    </div>
  </div>
</template>

<style scope lang="scss">
</style>
