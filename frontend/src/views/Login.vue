<template>
  <div class="login">
    <div class="test">
      <Header />
      <div class="content">
        <Form
          title="Connectez-vous"
          question="Pas encore de compte"
          option="Inscrivez-vous"
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
  components: {
    Header,
    Footer,
    Form,
  },
};
</script>

<style scope lang="scss">
.login {
  min-height: 100vh;
  @include flexbox(space-between, column, center);
}
.test {
  width: 100%;
  min-height: 100%;
}
.content {
  min-height: 100%;
  background-image: url("../../public/images/fond.png");
  background-size: cover;
  padding: 50px 0;
}
</style>
