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
          intention: "alert",
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
        this.$emit("display-form");
      }
    },
  },
};
</script>

<template>
  <form enctype="multipart/form-data" @submit.prevent="addPost" class="form postcreation">

    <BaseButton
      tag="button"
      @click.prevent.stop="$emit('display-form')"
      isCloseBtn
    >
      <font-awesome-icon icon="times" />
    </BaseButton>

    <!-- <font-awesome-icon
      icon="times"
      @click.prevent.stop="$emit('display-form')"
      class="close-cross"
    /> -->

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

    <FormImageUpload
      v-on:send-imagefile="setFile"
      :wasPosted="wasPosted"
      inputfile="postCreation"
    />

    <!-- <BaseButton>Publier</BaseButton> -->

    <BaseButton
      tag="button"
      nativeType="submit"
      isGenericBtn
    >
      Publier
    </BaseButton>

    <!-- <input
      type="submit"
      value="Annuler"
      @click.prevent.stop="$emit('display-form')"
      class="global-btn"
    /> -->

    <BaseButton
      tag="button"
      @click.prevent.stop="$emit('display-form')"
      isCancelBtn
    >
      Annuler
    </BaseButton>
  </form>
</template>

<style scope lang="scss"></style>