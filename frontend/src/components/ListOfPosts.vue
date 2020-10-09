<template>
  <div class="listOfPosts">
    <div class="listOfPosts-unit" v-for="post in listOfPosts" :key="post.id">
      <Post :post="post" />
    </div>
  </div>
</template>

<script>
import Post from "@/components/Post.vue";

export default {
  name: "ListOfPosts",
  components: { Post },
  props: {
    listOfPosts: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scope lang="scss">
.listOfPosts {
  width: 50%;
  margin: 30px auto;

  @media screen and(max-width: $large + 100) {
    width: 70%;
  }
  @media screen and(max-width: $small) {
    width: 90%;
  }
  &-unit {
    margin-top: 20px;
  }
}
</style>
