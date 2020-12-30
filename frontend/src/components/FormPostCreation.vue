<script>
import { mapActions } from "vuex";
import formValidation from "../mixins/formValidation"
import BaseButton from "@/components/BaseButton";
import FormImageUpload from "@/components/FormImageUpload";

export default {
  name: "FormPostCreation",

  components: { BaseButton, FormImageUpload },
  
  mixins: [formValidation],

  data() {
    return {
      file: null,
      newPostTitle: "",
      wasPosted: false,
    };
  },

  methods: {
    ...mapActions(["add"]),

    setFile(image) { this.file = image },

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
          intention: "alert",
          message: "Votre publication doit contenir un titre et une image !",
        };
        this.$store.commit("displayPopup", contexte);
        return;
      }

      if (!this.contentValidation(this.newPostTitle)) {
        return;
      }

      const options = {
        url: process.env.VUE_APP_LOCALHOST_URL + "posts/",
        mutation: "newPost",
        data: formData,
      };
      this.add(options);
      this.newPostTitle = "";
      this.wasPosted = true;
      this.file = null;
      this.$emit("display-form");
    },
  },
};
</script>


<template>
  <form @submit.prevent="addPost" enctype="multipart/form-data" class="form postcreation">

    <!-- Croix pour fermer le formulaire -->
    <BaseButton @click.prevent.stop="$emit('display-form')" tag="button" isCloseBtn >
      <font-awesome-icon icon="times" />
    </BaseButton>

    <h2 class="form__title">Partager avec vos collègues :</h2>

    <div class="form__group">
      <input
        type="text"
        id="title"
        name="title"
        placeholder="Titre"
        required
        v-model="newPostTitle"
        class="form__field"
      />
      <label for="title" class="form__label">Titre</label>
    </div>

    <FormImageUpload @send-imagefile="setFile" :wasPosted="wasPosted" inputfile="postCreation" />

    <BaseButton tag="button" nativeType="submit" isGenericBtn>
      Publier
    </BaseButton>
    <BaseButton @click.prevent.stop="$emit('display-form')" tag="button" isCancelBtn>
      Annuler
    </BaseButton>
  </form>
</template>


<style scope lang="scss"></style>