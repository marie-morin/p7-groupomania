<template>
  <div class="comment-unit">
    <div class="comment-likes">
      <p class="likes">{{ comment.likes.length }}</p>
      <font-awesome-icon @click="sendLike()" v-bind:class="{ liked: wasLiked }" class="icon up" icon="arrow-up" />
    </div>

      {{ comment.content }} par {{ comment.User.username }} <br/>

      <input type="text" v-if="editing" v-model="updatedComment" @keyup.enter="submitComment()">

      <button @click="deleteComment(comment.id)">Supprimer le commentaire</button>
      <!-- <button @click="deleteComment(comment.id)" v-if="isAllowed">Supprimer le commentaire</button> -->

      <button @click="editComment()">Modifier votre commentaire</button>
      <!-- <button @click="editComment()" v-if="isCreator">Modifier votre commentaire</button> -->

  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {
  name: "Comment",

  props: {
    comment: {
      type: Object,
      required: true,
    }
  },

  data: function() {
    return {
      editing : false,
      updatedComment: "",
      wasLiked: false,
    };
  },

  computed: { 
    ...mapGetters(['currentUser']),

    isAllowed() {
      return this.currentUser.isAdmin === true || this.comment.userId === this.currentUser.id
    },

    isCreator() {
      return this.comment.userId === this.currentUser.id
    }
  },

  methods: {
    ...mapActions(['deleteComment', 'updateComment', 'fetchCommentLikes', 'rateComment']),

    editComment() {
      this.editing = true;
    },

    submitComment() {
      const comment = {
        content: this.updatedComment,
        id: this.comment.id
      };
      this.updateComment(comment),
      this.updatedComment = "";
    },

    sendLike() {   
      this.rateComment(this.comment.id);
      this.wasLiked = !this.wasLiked;
    },

  },
      created() {
      this.fetchCommentLikes(this.comment.id);
  },
};
</script>

<style scope lang="scss">
.comment-unit {
  border: 1px solid black;
  margin: 10px 0 10px 10px;
  background-color: darkgray;
}

.comment-likes {
  width: 40px;
    min-height: 100%;
    margin: 0;
    padding: 0;
    background-color: $groupomania-back-grey;
    @include flexbox(center, column, center);
}

 .likes {
    margin: 5px 0;
    font-weight: bold;
    color: $groupomania-police;
  }

  .liked {
  background-color: green;
}

.icon {
  color: $groupomania-police;
  font-size: 20px;
  margin: 0;

  &:hover {
    color: green;
  }
}
</style>
