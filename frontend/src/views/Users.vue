<script>
import { mapGetters, mapActions } from "vuex";
import BaseCardUser from "@/components/BaseCardUser";
import BaseSearch from "@/components/BaseSearch";

export default {
  name: "Users",

  components: { BaseCardUser, BaseSearch },

  computed: mapGetters(["allUsers"]),

  created() {
    const options = {
      url: process.env.VUE_APP_LOCALHOST_URL + "users/",
      mutation: "setUsers",
    };
    this.fetch(options);
  },

  methods: mapActions(["fetch"]),
};
</script>

<template>
  <div class="home">
    <BaseSearch :items="allUsers" />
    <BaseCardUser v-for="user in allUsers" :key="user.id" :user="user" />
  </div>
</template>

<style scope lang="scss">
// .home {
//   min-height: 100vh;
//   @include flexbox(space-between, column, center);
//   color: black;
// }

// .content {
//   width: 100vw;
//   min-height: 80vh;
//   background-color: $groupomania-background;
//   padding: 70px 0;
// }
</style>
