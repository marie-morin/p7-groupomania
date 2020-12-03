<template>
  <div class="signup">
    <div class="top-content">
      <Header />
      <div class="content">
        <SignForm :settings="settings" :user="user" />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>

import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import SignForm from "@/components/SignForm.vue";

export default {
  name: "Signup",

  components: { Header, Footer, SignForm },

  data() {
    return {
      user: { email: "", firstname: "", lastname: "", password: "", passwordConf: "", bio: "" },
      settings: {
        destination: "login",
        urlPost: process.env.VUE_APP_LOCALHOST_URL + "users/signup",
        question: "Déjà un compte",
        option: "Connectez-vous",
        title: "S'inscrire",
      }
    };
  },
};
</script>

<style scoped lang="scss">
.signup {
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
</style>
