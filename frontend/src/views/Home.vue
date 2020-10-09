<template>
  <div class="home">
    <div class="top-content">
      <Header />
      <div class="content">
        <PostForm />
        <ListOfPosts :listOfPosts="listOfPosts" />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import ListOfPosts from "@/components/ListOfPosts.vue";
import PostForm from "@/components/PostForm.vue";
import axios from "axios";

export default {
  name: "Home",
  components: { Header, Footer, ListOfPosts, PostForm },

  data: function() {
    return {
      apiUrl: "http://localhost:3000/api/posts",
      listOfPosts: [],
    };
  },

  beforeCreate: function() {
    axios
      .get("http://localhost:3000/api/posts")
      .then((response) => {
        this.listOfPosts = response.data;
      })
      .catch((error) => console.log(error));
  },
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
