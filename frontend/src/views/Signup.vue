<script>
import FormRegister from "@/components/FormRegister.vue";

export default {
  name: "Signup",

  components: { FormRegister },

  data() {
    return {
      user: {
        email: "",
        firstname: "",
        lastname: "",
        password: "",
        passwordConf: "",
        bio: "",
      },
      settings: {
        destination: "login",
        urlPost: process.env.VUE_APP_LOCALHOST_URL + "users/signup",
        question: "Déjà un compte",
        option: "Connectez-vous",
        title: "S'inscrire",
      },
    };
  },
};
</script>

<template>
  <div class="signup">
    <FormRegister :settings="settings" :user="user" />
  </div>
</template>

<style scoped lang="scss">
// .signup {
//   min-height: 100vh;
//   @include flexbox(space-between, column, center);
// }
// .top-content {
//   width: 100vw;
//   height: 100%;
// }
// .content {
//   width: 100vw;
//   min-height: 80vh;
//   background-image: url("../../public/images/fond.png");
//   background-size: cover;
//   padding: 70px 0;
// }
</style>
