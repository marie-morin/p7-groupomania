<template>
  <div class="profil">
    <div class="test">
      <Header />
      <div class="content">
        <UserInfos name="Marie" />
        <Post
          name="Marie Morin"
          date="6 jours"
          title="Looking for darihana and Dani Munoz fit guides"
          content="Does anyone have any darihana or Dani Munoz guides they are willing to share?"
          comments="8"
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
import UserInfos from "@/components/UserInfos.vue";
import Post from "@/components/Post.vue";

export default {
  name: "Signup",
  components: {
    Header,
    Footer,
    UserInfos,
    Post,
  },
};
</script>

<style scope lang="scss">
.profil {
  min-height: 100vh;
  @include flexbox(space-between, column, center);
}
.test {
  width: 100%;
  min-height: 100%;
}
.content {
  min-height: 100%;
  background-color: $groupomania-back-grey;
  padding: 50px 0;
}
</style>
