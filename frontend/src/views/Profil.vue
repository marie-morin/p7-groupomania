<template>
  <div class="profil">
    <div class="top-content">
      <Header />
      <div class="content">

        <UserInfos v-if="isOwner" :isOwner="isOwner" :user="currentUser"/>
        <UserInfos v-else :isOwner="isOwner" :user="guest"/>

        <Button v-if="isOwner" :onClick="displayProfilForm" >Modifier mon profil</Button>
        <Button v-if="isOwner" :onClick="displayPasswordFrom" >Modifier mon mot de passe</Button>
        <Button v-if="isOwner || isAdmin" :onClick="deleteProfil" >Supprimer le profil</Button>

        <form v-if="passwordFormDisplayed">
          <label for="initialMdp">Votre mot de passe actuel :</label> <br>
          <input type="password" id="initialMdp" name="initialMdp" v-model="updatedPassword.initialMdp" required><br>

          <label for="newMdp">Votre nouveau mot de passe :</label><br>
          <input type="password" id="newMdp" name="newMdp" v-model="updatedPassword.newMdp" required><br>

          <label for="newMdpConf">Confirmation de votre nouveau mot de passe :</label><br>
          <input type="password" id="newMdpConf" name="newMdpConf" v-model="updatedPassword.newMdpConf" required ><br>

          <div class="form-btn">
            <Button :onClick="updatePassword">Modifier</Button>
            <Button :onClick="displayPasswordFrom">Annuler</Button>
          </div>
        </form>

        <ProfilForm v-if="isOwner" v-show="profilFormDisplayed" v-on:display-form="displayProfilForm()"/>
        
        <div class="post" v-for="post in posts" :key="post.id">
          <Post :post="post" />
        </div>

      </div>
    </div>
    <Footer /> 
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import UserInfos from "@/components/UserInfos.vue";
import ProfilForm from "@/components/ProfilForm.vue";
import Post from "@/components/Post.vue";
import Button from "@/components/Button";



export default {
  name: "Profil",

  components: { Header, Footer, UserInfos, ProfilForm, Post, Button },

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
