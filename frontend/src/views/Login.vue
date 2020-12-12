<script>
import FormRegister from "@/components/FormRegister";

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
      },
    };
  },
};
</script>

<template>
  <div class="login">
    <FormRegister :user="user" :settings="settings" />
  </div>
</template>

<style scoped lang="scss">
</style>
