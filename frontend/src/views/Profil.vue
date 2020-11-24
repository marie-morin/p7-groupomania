
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

        <ProfilForm v-if="isOwner" v-show="showForm" v-on:display-form="displayFrom()"/>
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

export default {
  name: "Profil",

  components: { Header, Footer, UserInfos, ProfilForm },

  data: function() {
    return {
      isOwner: false,
      isAdmin: false,
      showForm: false,
    };
  },

  computed: { ...mapGetters(['currentUser', "guest"])},

  methods: {
    ...mapActions(['deleteUser', 'fetchOneUser']),

    deleteProfil: function() {
      if (window.confirm("Voulez-vous vraiment supprimer votre compte ?")) {
        this.deleteUser(this.$route.params.id);
      }
      if (this.isAdmin) {
        this.$router.push("Home");
      } else {
        localStorage.clear();
        this.$router.push("Landing");
      }
    },

    displayFrom: function() {
      this.showForm = !this.showForm;
      return this.showForm;
    },
  },

  created() {
    this.fetchOneUser(this.$route.params.id);

    if (this.currentUser.isAdmin == true) {
      this.isAdmin = true;
    }
    if (this.currentUser.id == this.$route.params.id) {
      this.isOwner = true;
    }
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
