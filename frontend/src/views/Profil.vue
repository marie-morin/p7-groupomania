<template>
  <div class="profil">
    <div class="top-content">
      <Header />
      <div class="content">
        <UserInfos v-if="isOwner" :isOwner="isOwner" :user="currentUser"/>
        <UserInfos v-else :isOwner="isOwner" :user="guest"/>
        <button v-if="isOwner" @click="displayFrom()">
          Modifier mon profil
        </button>
        <button v-if="isOwner || isAdmin" @click.prevent="deleteProfil">
          Supprimer mon profil
        </button>
        <ProfilForm v-if="isOwner" v-show="displayForm" v-on:display-form="displayFrom()"/>
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
      displayForm: false,
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
      const confirmContexte = {
        origin: "profil",
        intention: "confirmation",
        message: "Voulez-vous vraiment supprimer votre compte ?",
        options: {
          url: `http://localhost:3000/api/users/${this.$route.params.id}`,
          mutation: "removeUser",
          id: this.$route.params.id
        },
      };
      this.$store.commit("displayPopup", confirmContexte);
    },

    displayFrom() { return this.displayForm = !this.displayForm; },
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
