<script>
import { mapGetters, mapActions } from "vuex";
import formValidation from "../mixins/formValidation";
import BaseComment from "@/components/BaseComment";
import BaseAvatar from "@/components/BaseAvatar";

export default {
  name: "SectionComments",

  components: { BaseComment, BaseAvatar },
  
  mixins: [formValidation],

  props: {
    post: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      displayComments: false,
      newComment: "",
    };
  },

  computed: mapGetters(["currentUser", "popup"]),

  created() {
    // Récupération de tous les commentaires du post
    const commentOptions = {
      url: process.env.VUE_APP_LOCALHOST_URL + `comments/from/${this.post.id}`,
      mutation: "setComments",
    };
    this.fetch(commentOptions);
  },

  methods: {
    ...mapActions(["fetch", "add"]),

    displayComment() { this.displayComments = !this.displayComments },

    addComment() {
      if (this.newComment == "") {
        const contexte = {
          intention: "alert",
          message: "Votre commentaire est vide !",
        };
        this.$store.commit("displayPopup", contexte);
        return;
      }

      if (!this.contentValidation(this.newComment)) {
        return;
      }

      const comment = {
        content: this.newComment,
        postId: this.post.id,
      };

      const options = {
        url: process.env.VUE_APP_LOCALHOST_URL + "comments/",
        mutation: "newComment",
        data: comment,
      };
      this.add(options);
      this.newComment = "";
    },
  },
};
</script>


<template>
  <div class="comment-section">
    <!-- Bouton toggle pour ouvrir la section commentaire -->
    <div
      @click="displayComment()"
      @keydown.enter="displayComment()"
      class="comment-section__preview"
      tabindex="0"
    >
      <font-awesome-icon icon="comment" class="comment-section__icon" />
      <p class="comment-section__amout">
        {{ post.comments.length }} commentaires
      </p>
    </div>

    <!-- Section commentaires -->
    <div v-show="displayComments === true" >

      <!-- Liste des commentaires -->
      <BaseComment v-for="comment in post.comments" :key="comment.id" :comment="comment" />

      <!-- Input pour ajouter un nouveau commentaire -->
      <div class="comment-section__new">
        <BaseAvatar :user="currentUser" origin="commentSection" />
        <input
          type="text"
          placeholder="Ajouter un commentaire..."
          required
          v-model="newComment"
          @keyup.enter="addComment()"
          class="comment-section__entry"
        />
      </div>
    </div>
  </div>
</template>


<style scope lang="scss">
.comment-section {
  padding: $base-padding;

  &__preview {
    @include flexbox(flex-start, row, center);
    cursor: pointer;
    margin-bottom: 0.5rem;
  }

  &__icon {
    margin: 0 0.5rem 0 0;
  }

  &__amout {
    margin: 0;
  }

  &__new {
    @include flexbox(flex-start, row, center);
  }

  &__entry {
    width: 100%;
    padding: $base-padding;

    background-color: $base-color;
    color: inherit;

    border: none;
    border-radius: $medium-radius;

    font-size: 1.8rem;
    font-family: inherit;
  }
}
</style>
