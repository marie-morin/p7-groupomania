<template>
  <div class="post-unit">

    <!-- Partie likes du bloc Post -->
    <div class="post-likes">
      <p class="likes">{{ post.likes.length }}</p>
      <font-awesome-icon @click="sendLike()" v-bind:class="{ liked: wasLiked }" class="icon up" icon="arrow-up" />
    </div>

    <div class="post-content">
      <p class="meta">
        <router-link :to="{ name: 'Profil', params: { id: post.UserId }}">{{ post.User.username }}</router-link>
        , il y a
      </p>
      <p class="title">{{ post.title }}</p>
      <p class="text">{{ post.content }}</p>

      <div v-if="editing">
        <label for="title">Nouveau titre</label>
        <input type="text" v-model="updatedPost.title" @keyup.enter="submitComment()" name="title"><br>

        <label for="content">Nouveau contenu</label>
        <input type="text" v-model="updatedPost.content" @keyup.enter="submitComment()" name="content">

        <button @click="sendUpdatedPost()">Valider la modification</button>
        <button @click="edit()">Annuler</button>
      </div>

      <div class="post-comments" @click="displayComment()">
        <font-awesome-icon class="icon comment" icon="comment" />
        <p>{{ post.comments.length }} commentaires</p>
      </div>

      <div v-show="showComment === true" class="comment-container">
        <div v-for="comment in post.comments" :key="comment.id">
          <Comment :comment="comment" />
        </div>
        <input type="text" v-model="newComment" @keyup.enter="onSubmit()" placeholder="Ajouter un commentaire..."/>
      </div> 

      <button @click="deletePost(post.id)" v-if="isAllowed">Supprimer le post</button>
      <button @click="edit()" v-if="isCreator">Modifier votre post</button>

    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import Comment from "@/components/Comment.vue"

export default {
  name: "Post",

  components: { Comment },

  props: {
    post: {
      type: Object,
      required: true,
    },
  },

  data: function() {
    return {
      showComment: false,
      newComment: "",
      editing : false,
      updatedPost: {
        title: this.post.title,
        content: this.post.content,
        id: this.post.id
      },
      wasLiked: false,
    };
  },

  computed: { 
    ...mapGetters(['currentUser']),

    isAllowed() {
      return this.currentUser.isAdmin === true || this.post.userId === this.currentUser.id
    },

    isCreator() {
      return this.post.userId === this.currentUser.id
    }
  },

  methods: {
    ...mapActions(['deletePost', 'fetchComments', 'addComment', 'deleteComment', 'updatePost', 'ratePost', 'fetchPostLikes']),

    displayComment() { this.showComment = !this.showComment },

    edit() { this.editing = !this.editing },

    onSubmit() {
      const comment = {
        content: this.newComment,
        PostId: this.post.id
      };
      this.addComment(comment);
      this.newComment = "";
    },

    sendUpdatedPost() {
      this.updatePost(this.updatedPost);
      this.editing = false;
    },

    sendLike() {   
      this.ratePost(this.post.id);
      this.wasLiked = !this.wasLiked;
    },
  },

  created() {
    console.log(this.currentUser);
    console.log(this.isAllowed);

    this.fetchComments(this.post.id);
    this.fetchPostLikes(this.post.id);
  },
};
</script>

<style scope lang="scss">
.post {

  &-unit{
    width: 100%;
    height: 100%;
    padding: 0;
    @include flexbox(flex-start, row, stretch);
    background-color: $groupomania-background;
    color: $groupomania-font-blue;
    border-radius: $radius;
    border: 1px solid $groupomania-medium-grey;
    text-align: left;
  }

  &-likes {
    width: 40px;
    min-height: 100%;
    margin: 0;
    padding: 0;
    background-color: $groupomania-back-grey;
    @include flexbox(center, column, center);
  }

  &-content {
    width: 100%;
    padding: 5px;
  }

  &-comments {
    @include flexbox(flex-start, row, center);
    cursor: pointer;

    p {
      margin: 0 0 0 5px;
    }
  }

  .icon {
    color: $groupomania-police;
    font-size: 20px;
    margin: 0;
    &.up {
      &:hover {
        color: green;
      }
    }
    &.down {
      &:hover {
        color: red;
      }
    }
    &.comment {
      color: $groupomania-light-grey;
    }
  }

  .likes {
    margin: 5px 0;
    font-weight: bold;
    color: $groupomania-police;
  }

  .meta {
    font-style: italic;
    font-weight: lighter;
    color: $groupomania-light-grey;
    margin: 0;
  }

  .title {
    font-weight: bold;
    font-size: 27px;
    margin: 10px 0;
  }

  .text {
    font-size: 20px;
    margin: 5px 0;
  }
}

.liked {
  background-color: green;
}
</style>
