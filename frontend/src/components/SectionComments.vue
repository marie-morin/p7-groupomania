<script>
import { mapGetters, mapActions } from "vuex";
import BaseComment from "@/components/BaseComment";

export default {
  name: "SectionComments",

  components: { BaseComment },

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

  computed: {
    ...mapGetters(["popup"]),
  },

  created() {
    const commentOptions = {
      url: process.env.VUE_APP_LOCALHOST_URL + `comments/from/${this.post.id}`,
      mutation: "setComments",
    };
    this.fetch(commentOptions);
  },

  methods: {
    ...mapActions(["fetch", "add"]),

    displayComment() {
      this.displayComments = !this.displayComments;
    },

    addComment() {
      if (this.newComment == "") {
        const contexte = {
          intention: "notification",
          message: "Votre commentaire est vide !",
        };
        this.$store.commit("displayPopup", contexte);
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

    <div @click="displayComment()" class="comment-section__preview">
      <font-awesome-icon icon="comment" class="comment-section__icon" />
      <p class="comment-section__amout">{{ post.comments.length }} commentaires</p>
    </div>

    <div v-show="displayComments === true" >
      <BaseComment v-for="comment in post.comments" :key="comment.id" :comment="comment" />

      <div class="comment-section__new">
        <img :src="post.imageUrl" alt="currentUser.username" class="avatar">
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
    @include flexbox(flex-start, row, flex-start);
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
