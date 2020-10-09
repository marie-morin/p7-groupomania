<template>
  <div class="profil">
    <div class="top-content">
      <Header />
      <div class="content">
        <UserInfos name="Marie" />

        <h2>Vos activitées</h2>
        <Post
          name="Marie Morin"
          date="6 jours"
          title="Looking for darihana and Dani Munoz fit guides"
          content="Does anyone have any darihana or Dani Munoz guides they are willing to share, anyone have any darihana or Dani Munoz guides they are willing to share ?"
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
  name: "Profil",
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
h2 {
  color: $groupomania-red;
}
</style>
