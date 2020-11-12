<template>
  <div class="home">
    <div class="top-content">
      <Header />
      <div class="content">
        <PostForm />

        <div class="posts">
          <div class="post" v-for="post in allPosts" :key="post.id">
            <Post :post="post" />
          </div>
        </div>

      </div>
    </div>
    <Footer />
  </div>
</template>

<script>

import { mapGetters, mapActions } from "vuex";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import PostForm from "@/components/PostForm.vue";
import Post from "@/components/Post.vue";


export default {
  name: "Home",

  components: { Header, Footer, PostForm, Post },

  methods: {
    ...mapActions(["fetchPosts"]),
  },

  created() {
    this.fetchPosts();
  },

  computed: mapGetters(["allPosts"]),
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
