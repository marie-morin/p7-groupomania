<script>
import { mapGetters, mapActions } from "vuex";
import BaseComment from "@/components/BaseComment.vue";

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
  <div class="test">
    <div class="post-comments" @click="displayComment()">
      <font-awesome-icon icon="comment" class="icon comment" />
      <p>{{ post.comments.length }} commentaires</p>
    </div>

    <div v-show="displayComments === true" class="comment-container">
      <div v-for="comment in post.comments" :key="comment.id">
        <BaseComment :comment="comment" />
      </div>

      <input
        type="text"
        placeholder="Ajouter un commentaire..."
        required
        v-model="newComment"
        @keyup.enter="addComment()"
      />
    </div>
  </div>
</template>

<style scope lang="scss"></style>
