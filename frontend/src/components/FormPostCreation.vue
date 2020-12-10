<script>
import { mapActions } from "vuex";
import BaseButton from "@/components/BaseButton";
import FormImageUpload from "@/components/FormImageUpload.vue";

export default {
  name: "FormPostCreation",

  components: { BaseButton, FormImageUpload },

  data() {
    return {
      file: null,
      newPostTitle: "",
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
    <FormImageUpload v-on:send-imagefile="setFile" />

    <div class="btn">
      <BaseButton>Publier</BaseButton>
    </div>
  </form>
</template>

<style scope lang="scss">
// .postForm {
//   // width: 50%;
//   margin: 0 auto;
//   color: $groupomania-font-blue;
//   border-radius: $radius;
//   border: 1px solid $groupomania-medium-grey;
//   text-align: left;
//   padding: 10px;
//   background-color: $groupomania-background;
// }
// form {
//   width: 100%;
// }

// input {
//   width: 100%;
//   height: 40px;
//   margin-top: 10px;
//   font-weight: bold;
//   font-size: 20px;
//   color: $groupomania-font-blue;
// }

// h2 {
//   margin: 5px 0;
// }
// .btn {
//   width: 40%;
//   margin: 0 auto;
// }

// .submit {
//   display: block;
//   border-radius: $radius;
//   background-color: $groupomania-red;
//   color: $groupomania-police;
//   font-weight: bold;
//   text-transform: uppercase;
//   border: none;
//   margin: 10px 0;

//   &:hover {
//     background-color: darken($color: $groupomania-red, $amount: 5);
//   }
// }

// .cl-upload {
//   background-color: cadetblue;
//   margin: 10px;
//   padding: 10px;
// }
</style>
