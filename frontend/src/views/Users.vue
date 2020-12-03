<template>
  <div class="home">
    <div class="top-content">
      <Header />
      <div class="content">
        <Search :items="allUsers" />
        <UserCard v-for="user in allUsers" :key="user.id" :user="user"/>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import UserCard from "@/components/UserCard.vue";
import Search from "@/components/Search.vue";

export default {
  name: "Users",

  components: { Header, Footer, UserCard, Search },
  
  computed: mapGetters(['allUsers']),

  created() {
    const options = { url: process.env.VUE_APP_LOCALHOST_URL + "users/", mutation: "setUsers" };
    this.fetch(options);
  },

  methods: mapActions(["fetch"]),
};
</script>

<style scope lang="scss">
.home {
  min-height: 100vh;
  @include flexbox(space-between, column, center);
  color: black;
}
.top-content {
  width: 100vw;
  height: 100%;
}
.content {
  width: 100vw;
  min-height: 80vh;
  background-color: $groupomania-background;
  padding: 70px 0;
}
</style>
