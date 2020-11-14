<template>
  <div class="post-unit">

    <!-- Partie likes du bloc Post -->
    <div class="post-likes">
      <font-awesome-icon class="icon up" icon="arrow-up" />
      <p class="likes">{{ post.likes }}</p>
      <font-awesome-icon class="icon down" icon="arrow-down" />
    </div>

    <div class="post-content">
      <!-- Partie contenu du bloc Post -->
      <p class="meta">Par {{ post.User.username }}, il y a</p>
      <p class="title">{{ post.title }}</p>
      <p class="text">{{ post.content }}</p>

      <!-- Partie visible des commentaires du Post -->
      <div class="post-comments" @click="displayComment(), fetchComments(post.id)">
        <font-awesome-icon class="icon comment" icon="comment" />
        <!-- <p>{{ post.comments }} commentaires</p> -->
        <p>commentaires</p>
      </div>

      <!-- Partie cachée des commentaire du Post / Toggle -->
      <div v-show="showComment === true" class="comment-container">
        <!-- Commentaires -->
        <div class="comment">
          <div v-for="comment in post.comments" :key="comment.id" class="comment-unit">
            {{ comment.content }} par {{ comment.User.username }} <br/>
            <!-- Bouton de suppression du Post -->
            <button>Supprimer le commentaire</button>
            <!-- Bouton d'édition du Post -->
            <button>Modifier votre commentaire</button>
          </div>
        </div>
        <!-- Input pour ajouter un commentaire -->
        <input type="text" v-model="newComment" @keyup.enter="onSubmit()" placeholder="Ajouter un commentaire..."/>
      </div> 

      <!-- Bouton de suppression du Post -->
      <button @click="deletePost(post.id)">Supprimer le post</button>

      <!-- Bouton d'édition du Post -->
      <button>Modifier votre post</button>

    </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex';

export default {
  name: "Post",

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
    };
  },

  methods: {
    ...mapActions(['deletePost', 'fetchComments', 'addComment']),

    displayComment: function() {
      this.showComment = !this.showComment;
      return this.showComment;
    },

    onSubmit() {
      const comment = {
        content: this.newComment,
        PostId: this.post.id
      };
      this.addComment(comment);
      this.newComment = "";
    },
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

.comment-unit {
  border: 1px solid black;
  margin: 10px 0 10px 10px;
  background-color: darkgray;
}
</style>
