<script>
import { mapGetters, mapActions } from "vuex";
import FormPostCreation from "@/components/FormPostCreation";
import BasePost from "@/components/BasePost";

export default {
  name: "Home",

  components: { FormPostCreation, BasePost },

  computed: mapGetters(["allPosts"]),

  created() {
    const options = {
      url: process.env.VUE_APP_LOCALHOST_URL + "posts",
      mutation: "setPosts",
    };
    this.fetch(options);
  },

  methods: mapActions(["fetch"]),
};
</script>

<template>
  <div class="home">
    <FormPostCreation />
    <BasePost
      :post="post"
      v-for="post in allPosts"
      :key="post.id"
    />
  </div>
</template>

<style scope lang="scss">
.home {
  width: 100%;
}
</style>
