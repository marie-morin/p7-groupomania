<script>
import FormRegister from "@/components/FormRegister.vue";
export default {
  name: "Login",

  components: { FormRegister },

  data() {
    return {
      user: { email: "", password: "" },
      settings: {
        destination: "signup",
        urlPost: process.env.VUE_APP_LOCALHOST_URL + "users/login",
        question: "Pas encore de compte",
        option: "Inscrivez-vous",
        title: "Se connecter",
      }
    };
  },
};
</script>


<template>
  <div class="login">
    <FormRegister 
      :user="user"
      :settings="settings"
    />
  </div>
</template>


<style scoped lang="scss">
.login {
  min-height: 100vh;
  @include flexbox(space-between, column, center);
}
// .top-content {
//   width: 100vw;
//   height: 100%;
// }
.content {
  width: 100vw;
  min-height: 80vh;
  background-image: url("../../public/images/fond.png");
  background-size: cover;
  padding: 70px 0;
}
</style>
