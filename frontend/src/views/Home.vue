<script>
import { mapGetters, mapActions } from "vuex";
import FormPostCreation from "@/components/FormPostCreation.vue";
import BasePost from "@/components/BasePost.vue";
export default {
  name: "Home",

  components: { FormPostCreation, BasePost },

  computed: mapGetters(["allPosts"]),

  created() {
    const options = { url: process.env.VUE_APP_LOCALHOST_URL + "posts", mutation: "setPosts" };
    this.fetch(options);
  },

  methods: mapActions(["fetch"])
};
</script>


<template>
  <div class="home">
    <FormPostCreation />
    <div class="posts">
      <div 
        v-for="post in allPosts" 
        :key="post.id"
        class="post"
      >
        <BasePost :post="post" />
      </div>
    </div>    
  </div>
</template>


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
.posts {
  width: 50%;
  margin: 30px auto;

  @media screen and(max-width: $large + 100) {
    width: 70%;
  }
  @media screen and(max-width: $small) {
    width: 90%;
  }
}
</style>
