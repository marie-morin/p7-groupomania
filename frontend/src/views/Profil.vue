<script>
import { mapActions, mapGetters } from 'vuex';
import InfosUser from "@/components/InfosUser.vue";
import FormProfilUpdate from "@/components/FormProfilUpdate.vue";
import BasePost from "@/components/BasePost.vue";
import BaseButton from "@/components/BaseButton";

export default {
  name: "Profil",

  components: { InfosUser, FormProfilUpdate, BasePost, BaseButton },

  data() {
    return {
      isOwner: false,
      isAdmin: false,
      profilFormDisplayed: false,
      passwordFormDisplayed: false,
      
      updatedPassword: {
        initialMdp: "",
        newMdp: "",
        newMdpConf: "",
        id: this.$route.params.id,
      },
    };
  },

  computed: {  
    ...mapGetters(['currentUser', 'guest', 'allPosts']),

    posts() { return this.$store.state.postModule.posts.filter((post) => post.userId == this.$route.params.id) }
  },

  watch: {
    '$route' (to) {
      const guestOptions = { url: process.env.VUE_APP_LOCALHOST_URL + `users/${to.params.id}`, mutation: "setGuest" };
      this.fetch(guestOptions);

      if (this.currentUser.isAdmin == true) {
        this.isAdmin = true;
      }
      if (this.currentUser.id == this.$route.params.id) {
        this.isOwner = true;
      }    
    }
  },

  created() {

    // Chargement de tous les posts
    const postsOptions = { url: process.env.VUE_APP_LOCALHOST_URL + "posts", mutation: "setPosts" };
    this.fetch(postsOptions);

    // Chargement du profil guest
    const guestOptions = { url: process.env.VUE_APP_LOCALHOST_URL + `users/${this.$route.params.id}`, mutation: "setGuest" };
    this.fetch(guestOptions);

    if (this.currentUser.isAdmin == true) {
      this.isAdmin = true;
    }
    if (this.currentUser.id == this.$route.params.id) {
      this.isOwner = true;
    }
  },
  
  methods: {
    ...mapActions(['fetch', 'token']),

    deleteProfil() {
      const contexte = {
        origin: "deleteProfil",
        intention: "confirmation",
        message: "Voulez-vous vraiment supprimer votre compte ?",
        options: {
          url: process.env.VUE_APP_LOCALHOST_URL + `users/${this.$route.params.id}`,
          mutation: "removeUser",
          id: this.$route.params.id
        },
      };
      this.$store.commit("displayPopup", contexte);
    },

    updatePassword() {
      if (
        this.updatedPassword == "" ||
        this.updatedPassword.initialMdp == "" ||
        this.updatedPassword.newMdp == "" ||
        this.updatedPassword.newMdpConf == "" ||
        this.updatedPassword.id == ""
      ) {
        const contexte = {
          intention: "notification",
          message: "Vous devez renseigner votre mot de passe actuel, votre nouveau mot de passe, et la confirmation de votre nouveau mot de passe !",
        };
        this.$store.commit("displayPopup", contexte);
        return;
      }

      if ( this.updatedPassword.newMdp !== this.updatedPassword.newMdpConf) {
        const contexte = {
          intention: "notification",
          message: "La confirmation du mot de passe doit être identique au nouveau mot de passe !",
        };
        this.$store.commit("displayPopup", contexte);
        return;
      }
      
      const contexte = {
        origin: "updatePassword",
        intention: "confirmation",
        message: "Voulez-vous vraiment modifier votre mot de passe ?",
        options: {
          url: process.env.VUE_APP_LOCALHOST_URL + `users/${this.$route.params.id}/password`,
          mutation: "setUser",
          data: this.updatedPassword,
        },
      };
      this.$store.commit("displayPopup", contexte);
    },

    displayProfilForm() { return this.profilFormDisplayed = !this.profilFormDisplayed; },

    displayPasswordFrom() { return this.passwordFormDisplayed = !this.passwordFormDisplayed; },
  }
};
</script>


<template>
  <div class="profil">
        <InfosUser 
          v-if="isOwner"
          :is-owner="isOwner"
          :user="currentUser"
        />
        <InfosUser
          v-else
          :is-owner="isOwner"
          :user="guest"
        />

        <BaseButton
          v-if="isOwner"
          :onClick="displayProfilForm"
        >
          Modifier mon profil
        </BaseButton>

        <BaseButton
          v-if="isOwner"
          :onClick="displayPasswordFrom"
        >
          Modifier mon mot de passe
        </BaseButton>

        <BaseButton
          v-if="isOwner || isAdmin"
          :onClick="deleteProfil"
        >
            Supprimer le profil
        </BaseButton>

        <form v-if="passwordFormDisplayed">
          <label for="initialMdp">Votre mot de passe actuel :</label> <br>
          <input
            type="password"
            id="initialMdp"
            name="initialMdp"
            required
            v-model="updatedPassword.initialMdp"
          >
          <br>

          <label for="newMdp">Votre nouveau mot de passe :</label><br>
          <input
            type="password"
            id="newMdp"
            name="newMdp"
            required
            v-model="updatedPassword.newMdp"
          >
          <br>

          <label for="newMdpConf">Confirmation de votre nouveau mot de passe :</label><br>
          <input
            type="password"
            id="newMdpConf"
            name="newMdpConf"
            required
            v-model="updatedPassword.newMdpConf"
          >
          <br>

          <div class="form-btn">
            <BaseButton :onClick="updatePassword">Modifier</BaseButton>
            <BaseButton :onClick="displayPasswordFrom">Annuler</BaseButton>
          </div>
        </form>

        <FormProfilUpdate
          v-if="isOwner"
          v-show="profilFormDisplayed"
          @display-form="displayProfilForm()"
        />
        
        <div
          v-for="post in posts"
          :key="post.id"
          class="post"
        >
          <BasePost :post="post" />
        </div>    
  </div>
</template>


<style scope lang="scss">
.profil {
  min-height: 100vh;
  @include flexbox(space-between, column, center);
}
.top-content {
  width: 100vw;
  height: 100%;
}
.content {
  width: 100vw;
  min-height: 80vh;
  background-image: url("../../public/images/fond.png");
  background-size: cover;
  padding: 70px 0;
}
h2 {
  color: $groupomania-red;
}
</style>
