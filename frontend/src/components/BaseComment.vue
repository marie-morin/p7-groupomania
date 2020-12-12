<script>
import { mapGetters, mapActions } from "vuex";
import BaseLike from "@/components/BaseLike";

export default {
  name: "BaseComment",

  components: { BaseLike },

  props: {
    comment: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      updatedComment: "",
      editing: false,
    };
  },

  computed: {
    ...mapGetters(["currentUser"]),

    isAllowed() {
      return (
        this.currentUser.isAdmin == true ||
        this.comment.userId == this.currentUser.id
      );
    },

    isCreator() {
      return this.comment.userId == this.currentUser.id;
    },

    wasPublished() {
      let creationDate;
      if (this.comment.createdAt == this.comment.updatedAt) {
        creationDate = new Date(this.comment.createdAt);
      } else {
        creationDate = new Date(this.comment.updatedAt);
      }
      const now = new Date();
      const timeSinceCreation =
        (now.getTime() - creationDate.getTime()) / (1000 * 3600 * 24);
      const daysSinceCreation = Math.round(timeSinceCreation);

      if (daysSinceCreation < 1) {
        return "aujourd'hui";
      }
      return `il y a ${daysSinceCreation} jours`;
    },
  },

  methods: {
    ...mapActions(["fetch", "update"]),

    deleteComment(id) {
      const contexte = {
        origin: "deleteComment",
        intention: "confirmation",
        message: "Etes-vous sur de vouloir supprimer votre commentaire ?",
        options: {
          url: process.env.VUE_APP_LOCALHOST_URL + `comments/${id}`,
          mutation: "removeComment",
          id: id,
        },
      };
      this.$store.commit("displayPopup", contexte);
    },

    editComment() {
      this.editing = !this.editing;
    },

    updateComment() {
      if (this.updatedComment == "") {
        const contexte = {
          intention: "notification",
          message: "Votre commentaire est vide !",
        };
        this.$store.commit("displayPopup", contexte);
        return;
      }

      const options = {
        url: process.env.VUE_APP_LOCALHOST_URL + `comments/${this.comment.id}`,
        mutation: "updateComment",
        data: this.updatedComment,
      };
      this.update(options);
      this.updatedComment = "";
    },
  },
};
</script>

<template>
  <div>
    <BaseLike
      :item="comment"
      url-endpoint="comments"
      rateMutation="rateComment"
      setMutation="setCommentLikes"
    />

    {{ comment.content }} par {{ comment.User.username }}, {{ wasPublished }}.

    <div v-if="editing">
      <input
        type="text"
        required
        v-model="updatedComment"
        @keyup.enter="updateComment()"
      />
      <button @click="editComment()">Annuler</button>
    </div>

    <button @click="deleteComment(comment.id)" v-if="isAllowed">
      Supprimer le commentaire
    </button>
    <button @click="editComment()" v-if="isCreator">
      Modifier votre commentaire
    </button>
  </div>
</template>

<style scope lang="scss"></style>