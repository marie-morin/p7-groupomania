<template>
  <div class="login">
    <div class="top-content">
      <Header />
      <div class="content">
        <SignForm :settings="settings" :user="user"/>
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
  name: "Login",

  components: { Header, Footer, SignForm },

  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      settings: {
        destination: "signup",
        urlPost: "http://localhost:3000/api/users/login",
        question: "Pas encore de compte",
        option: "Inscrivez-vous",
      }
    };
  },
};
</script>

<style scoped lang="scss">
.login {
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
