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
  <div>
    <BaseSearch :items="allUsers" />
    <BaseCardUser v-for="user in allUsers" :key="user.id" :user="user" />
  </div>
</template>

<style scope lang="scss">
</style>
