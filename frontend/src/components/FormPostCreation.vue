<script>
import { mapActions } from 'vuex';
import BaseButton from "@/components/BaseButton";
export default {
  name: "FormPostCreation",

  components: { BaseButton },

  data() {
    return {
      newPost: {
        title: "",
        content: "",
      },
    };
  },

  methods: {
    ...mapActions(["add"]),

    addPost() {
      if (this.newPost.title == "" || this.newPost.content == "") {
        const contexte = {
          intention: "notification",
          message: "Vtre publication doit contenir un titre et du contenu !",
        };
        this.$store.commit("displayPopup", contexte);
        return;
      }

      const options = {
        url: process.env.VUE_APP_LOCALHOST_URL + "posts/",
        mutation: "newPost",
        data: this.newPost,
      }
      this.add(options);
      this.newPost.title = "";
      this.newPost.content = "";
    },
  },
};
</script>


<template>
  <div class="postForm">
    <form @submit.prevent="addPost">
      <h2>Partager avec vos collègues :</h2>

      <input
        type="text"
        id="title"
        name="title"
        placeholder="Titre"
        required
        v-model="newPost.title"
      />
      <br />

      <input
        type="text"
        id="content"
        name="content"
        placeholder="Que voulez-vous partager ?"
        required
        v-model="newPost.content"
      />

      <div class="btn">
        <BaseButton>Publier</BaseButton>
      </div>

    </form>
  </div>
</template>

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
