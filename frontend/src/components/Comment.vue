<template>
  <div class="comment-unit">

      {{ comment.content }} par {{ comment.User.username }} <br/>

      <input type="text" v-if="editing" v-model="updatedComment" @keyup.enter="submitComment()">

      <button @click="deleteComment(comment.id)">Supprimer le commentaire</button>

      <button @click="editComment()">Modifier votre commentaire</button>

  </div>
</template>

<script>

import { mapActions } from 'vuex';

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
    };
  },

  methods: {
    ...mapActions(['deleteComment', 'updateComment']),

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
    }
  },
};
</script>

<style scope lang="scss">
.comment-unit {
  border: 1px solid black;
  margin: 10px 0 10px 10px;
  background-color: darkgray;
}

</style>
