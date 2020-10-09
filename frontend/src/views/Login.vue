<template>
  <div class="login">
    <div class="top-content">
      <Header />
      <div class="content">
        <Form
          title="Connectez-vous"
          question="Pas encore de compte"
          option="Inscrivez-vous"
          :schema="schema"
          :urlPost="urlPost"
        />
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
  name: "Login",
  components: { Header, Footer, Form },
  data() {
    return {
      schema: {
        email: { elt: "input", type: "text", label: "Email" },
        password: { elt: "input", type: "password", label: "Mot de passe" },
      },
      urlPost: "http://localhost:3000/api/users/login",
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
