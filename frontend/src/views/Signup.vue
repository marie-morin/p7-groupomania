<script>
import FormRegister from "@/components/FormRegister";

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
  <div class="container">
    <FormRegister :settings="settings" :user="user"/>
  </div>
</template>


<style scoped lang="scss"></style>