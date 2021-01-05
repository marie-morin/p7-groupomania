<script>
import { mapGetters, mapActions } from "vuex";
import FormPostCreation from "@/components/FormPostCreation";
import BasePost from "@/components/BasePost";
import BaseButton from "@/components/BaseButton";

export default {
  name: "Home",

  components: { FormPostCreation, BasePost, BaseButton },

  data() {
    return { postCreationFormDisplayed: false };
  },

  computed: mapGetters(["allPosts"]),

  created() {
    // Récupération de tous les posts
    const options = {
      url: process.env.VUE_APP_LOCALHOST_URL + "posts",
      mutation: "setPosts",
    };
    this.fetch(options);
  },

  methods:  {
    ...mapActions(["fetch"]),

    displayPostCreationForm() { this.postCreationFormDisplayed = !this.postCreationFormDisplayed },

    onClose(){
      this.postCreationFormDisplayed = false;
    },
  }
};
</script>


<template>
  <div class="home container">
    <h1 class="title">Vos actualités</h1>

    <BaseButton
      @click="displayPostCreationForm()"
      tag="button"
      isGenericBtn
      tabindex="0"
      class="openPostCreationFrom"
    >
      Créer une publication
    </BaseButton>

    <!-- <div v-show="postCreationFormDisplayed" class="popupform" @click="offClick"> -->

    <div
      v-show="postCreationFormDisplayed"
      class="popupform"
    >
      <FormPostCreation
        @display-form="displayPostCreationForm()"
        class="popup-form__form"
        v-outside-click="{ exclude: ['openPostCreationFrom'], handler: onClose }"
      />
    </div>

    <div v-if="allPosts.length">
      <BasePost v-for="post in allPosts" :key="post.id" :post="post" />
    </div>
    <p v-else> Aucune publication a afficher !</p>
  </div>
</template>


<style scope lang="scss">
.title {
  font-weight: 400;
}
</style>