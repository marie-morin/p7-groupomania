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

    offClick(event) {
      if (event.target.closest("#formPostCreation") == null) {
        this.displayPostCreationForm();
      }
    }
  }
};
</script>


<template>
  <div class="home container">
    <BaseButton
      @click="displayPostCreationForm()"
      
      tag="button"
      isGenericBtn
      class="postCreationBtn"
      tabindex="0"
    >
      Créer une publication
    </BaseButton>

    <div v-show="postCreationFormDisplayed" class="popupform" @click="offClick">
      <FormPostCreation
        @display-form="displayPostCreationForm()"
        class="popup-form__form"
        id="formPostCreation"
      />
    </div>

    <div v-if="allPosts.length">
      <BasePost v-for="post in allPosts" :key="post.id" :post="post" />
    </div>
    <p v-else> Aucune publication a afficher !</p>
  </div>
</template>


<style scope lang="scss">
.postCreationBtn {
  margin-top: 2.5rem !important;
}
</style>