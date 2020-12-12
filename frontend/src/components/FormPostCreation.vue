<script>
import { mapActions } from "vuex";
import BaseButton from "@/components/BaseButton";
import FormImageUpload from "@/components/FormImageUpload";

export default {
  name: "FormPostCreation",

  components: { BaseButton, FormImageUpload },

  data() {
    return {
      file: null,
      newPostTitle: "",
      wasPosted: false,
    };
  },

  methods: {
    ...mapActions(["add"]),

    setFile(image) {
      this.file = image;
    },

    addPost() {
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("title", JSON.stringify(this.newPostTitle));

      if (
        this.newPostTitle == "" ||
        formData.get("file") == "null" ||
        formData.get("title") == "null"
      ) {
        const contexte = {
          intention: "notification",
          message: "Votre publication doit contenir un titre et une image !",
        };
        this.$store.commit("displayPopup", contexte);
        return;
      } else {
        const options = {
          url: process.env.VUE_APP_LOCALHOST_URL + "posts/",
          mutation: "newPost",
          data: formData,
        };
        this.add(options);
        this.newPostTitle = "";
        this.wasPosted = true;
      }
    },
  },
};
</script>

<template>
  <form enctype="multipart/form-data" @submit.prevent="addPost">
    <h2>Partager avec vos collègues :</h2>

    <label for="title">Titre</label>
    <input
      type="text"
      id="title"
      name="title"
      placeholder="Titre"
      required
      v-model="newPostTitle"
    />

    <label for="file-input">Image</label>
    <FormImageUpload v-on:send-imagefile="setFile" :wasPosted="wasPosted" />

    <BaseButton>Publier</BaseButton>
  </form>
</template>

<style scope lang="scss">
</style>
