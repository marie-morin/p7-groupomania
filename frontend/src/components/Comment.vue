<template>
  <div class="comment-unit">
    <div class="comment-likes">
      <p class="likes">{{ comment.likes.length }}</p>
      <font-awesome-icon @click="like()" v-bind:class="{ liked: wasLiked }" class="icon up" icon="arrow-up" />
    </div>

      {{ comment.content }} par {{ comment.User.username }} <br/>

      <input type="text" v-if="editing" v-model="updatedComment" @keyup.enter="updateComment()">

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

  data() {
    return {
      editing : false,
      updatedComment: "",
      wasLiked: false,
    };
  },

  computed: { 
    ...mapGetters(['currentUser']),

    isAllowed() {
      return this.currentUser.isAdmin == true || this.comment.userId == this.currentUser.id
    },

    isCreator() {
      return this.comment.userId == this.currentUser.id
    }
  },

   created() {
    const likesOptions = {
      url: `http://localhost:3000/api/comments/${this.comment.id}/like`,
      mutation: "setCommentLikes",
    };
    this.fetch(likesOptions);    
  },


  methods: {
    ...mapActions(['delete', 'fetch', 'add', 'update', 'rate']),

    deleteComment(id) {
      const options = {
        url: `http://localhost:3000/api/comments/${id}`,
        mutation: "removeComment",
        id: id
      }
      this.delete(options);
    },

    editComment() {
      this.editing = true;
    },

    updateComment() {
      const options = {
        url: `http://localhost:3000/api/comments/${this.comment.id}`,
        mutation: "updateComment",
        data: this.updatedComment,
      }
      this.update(options);      
      this.updatedComment = "";
    },

    like() {   
      const options = {
        url: `http://localhost:3000/api/comments/like`,
        mutation: "setCommentRate",
        id: this.comment.id
      };
      this.rate(options);
      this.wasLiked = !this.wasLiked;
    },
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
