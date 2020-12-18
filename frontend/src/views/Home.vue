<script>
import { mapGetters, mapActions } from "vuex";
import FormPostCreation from "@/components/FormPostCreation";
import BasePost from "@/components/BasePost";
import BaseButton from "@/components/BaseButton";

export default {
  name: "Home",

  components: { FormPostCreation, BasePost, BaseButton },

  data() {
    return {
      postCreationFormDisplayed: false,
    };
  },

  computed: mapGetters(["allPosts"]),

  created() {
    const options = {
      url: process.env.VUE_APP_LOCALHOST_URL + "posts",
      mutation: "setPosts",
    };
    this.fetch(options);
  },

  methods:  {
    ...mapActions(["fetch"]),

    displayPostCreationForm() {
      this.postCreationFormDisplayed = !this.postCreationFormDisplayed;
    },

  }
};
</script>

<template>
  <div class="home">

    <BaseButton :onClick="displayPostCreationForm">Créer une publication</BaseButton>

    <div
      v-show="postCreationFormDisplayed"
      class="popupform"
    >
      <FormPostCreation
        class="popup-form__form"
        @display-form="displayPostCreationForm()"
      />
    </div>

    <BasePost
      :post="post"
      v-for="post in allPosts"
      :key="post.id"
    />
  </div>
</template>

<style scope lang="scss"></style>