<template>
  <div class="postForm">
    <form action="">
      <h2>Partager avec vos collègues :</h2>

      <input
        type="text"
        name="title"
        id="title"
        placeholder="Titre"
        v-model="postContent.title"
      />
      <br />

      <input
        type="text"
        name="content"
        id="content"
        placeholder="Que voulez-vous partager ?"
        v-model="postContent.content"
      />

      <div class="btn">
        <input type="submit" class="submit" @click.prevent="post" />
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PostForm",

  data: function() {
    return {
      postContent: {
        title: "",
        content: "",
      },
    };
  },

  methods: {
    post: function() {
      let TOKEN = localStorage.getItem("jwt");
      const headers = {
        Authorization: "Bearer " + TOKEN.replace(/['"']+/g, ""),
      };

      const post = this.postContent;
      axios
        .post(
          "http://localhost:3000/api/posts/",
          { body: JSON.stringify(post) },
          { headers: headers }
        )
        .then(() => {
          this.$router.go();
        })
        .catch((error) => (this.msgError = error));
    },
  },
};
</script>

<style scope lang="scss">
.postForm {
  width: 50%;
  margin: 0 auto;
  color: $groupomania-font-blue;
  border-radius: $radius;
  border: 1px solid $groupomania-medium-grey;
  text-align: left;
  padding: 10px;
  background-color: $groupomania-background;
}
form {
  width: 100%;
}

input {
  width: 100%;
  height: 40px;
  margin-top: 10px;
  font-weight: bold;
  font-size: 20px;
  color: $groupomania-font-blue;
}

h2 {
  margin: 5px 0;
}
.btn {
  width: 40%;
  margin: 0 auto;
}

.submit {
  display: block;
  border-radius: $radius;
  background-color: $groupomania-red;
  color: $groupomania-police;
  font-weight: bold;
  text-transform: uppercase;
  border: none;
  margin: 10px 0;

  &:hover {
    background-color: darken($color: $groupomania-red, $amount: 5);
  }
}
</style>
