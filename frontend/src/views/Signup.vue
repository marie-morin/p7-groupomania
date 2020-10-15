<template>
  <div class="signup">
    <div class="top-content">
      <Header />

      <div class="content">
        <Form :settings="settings" :schema="schema" />
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Form from "@/components/Form.vue";

export default {
  name: "Signup",
  components: { Header, Footer, Form },
  data() {
    return {
      settings: {
        goal: "post",
        title: "Inscrivez-vous",
        question: "Déjà un compte",
        option: "Connectez-vous",
        destination: "login",
        urlPost: "http://localhost:3000/api/users/signup",
      },
      schema: {
        email: { elt: "input", type: "text", label: "Email" },
        firstname: { elt: "input", type: "text", label: "Prénom" },
        lastname: { elt: "input", type: "text", label: "Nom" },
        password: { elt: "input", type: "password", label: "Mot de passe" },
        bio: { elt: "textarea", label: "Biographie" },
      },
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
