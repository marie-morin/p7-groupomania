<template>
  <div class="profil">
    <div class="top-content">
      <Header />
      <div class="content">

        <UserInfos v-if="isOwner" :isOwner="isOwner" :user="currentUser"/>
        <UserInfos v-else :isOwner="isOwner" :user="guest"/>

        <button v-if="isOwner" @click="displayProfilForm()">Modifier mon profil</button>
        <button v-if="isOwner" @click="displayPasswordFrom()">Modifier mon mot de passe </button>

        <form v-if="passwordFormDisplayed" action="updatePassword">
          <label for="initialMdp">Votre mot de passe actuel :</label> <br>
          <input type="password" id="initialMdp" name="initialMdp" v-model="updatedPassword.initialMdp" required><br>

          <label for="newMdp">Votre nouveau mot de passe :</label><br>
          <input type="password" id="newMdp" name="newMdp" v-model="updatedPassword.newMdp" required><br>

          <label for="newMdpConf">Confirmation de votre nouveau mot de passe :</label><br>
          <input type="password" id="newMdpConf" name="newMdpConf" v-model="updatedPassword.newMdpConf" required><br>

          <div class="form-btn">
            <input type="submit" value="Modifier" />
            <input type="submit" value="Annuler" @click="displayPasswordFrom()" />
          </div>
        </form>

        <button v-if="isOwner || isAdmin" @click.prevent="deleteProfil">Supprimer mon profil</button>
        <ProfilForm v-if="isOwner" v-show="profilFormDisplayed" v-on:display-form="displayProfilFrom()"/>
        
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


export default {
  name: "Profil",

  components: { Header, Footer, UserInfos, ProfilForm, Post },

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

  created() {
    // Chargement de tous les posts
    const postsOptions = { url: "http://localhost:3000/api/posts", mutation: "setPosts" };
    this.fetch(postsOptions);

    // Chargement du profil guest
    const guestOptions = { url: `http://localhost:3000/api/users/${this.$route.params.id}`, mutation: "setGuest" };
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
        origin: "profil",
        intention: "confirmation",
        message: "Voulez-vous vraiment supprimer votre compte ?",
        options: {
          url: `http://localhost:3000/api/users/${this.$route.params.id}`,
          mutation: "removeUser",
          id: this.$route.params.id
        },
      };
      this.$store.commit("displayPopup", contexte);
    },

    updatePassword() {
      const contexte = {
        origin: "profil",
        intention: "confirmation",
        message: "Voulez-vous vraiment modifier votre mot de passe ?",
        options: {
          url: `http://localhost:3000/api/users/password/${this.$route.params.id}`,
          mutation: "updatePassword",
          id: this.$route.params.id
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
