<template>
  <div class="post-unit">
    <div class="post-likes">
      <font-awesome-icon class="icon up" icon="arrow-up" />
      <p class="likes">{{ post.likes }}</p>
      <font-awesome-icon class="icon down" icon="arrow-down" />
    </div>

    <div class="post-content">
      <p class="meta">Par {{ post.User.username }}, il y a</p>
      <p class="title">{{ post.title }}</p>
      <p class="text">{{ post.content }}</p>

      <div class="post-comments" @click="displayComment()">
        <font-awesome-icon class="icon comment" icon="comment" />
        <p>{{ post.comments }} commentaires</p>
      </div>

      <div v-show="showComment === true" class="comment-container">
        <input type="text" @keyup.enter="postComment" placeholder="Ajouter un commentaire..."/>
        <div class="comment">
        </div>
      </div>
      <button @click="deletePost(post.id)">Supprimer le post</button>

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
    };
  },

  methods: {
    ...mapActions(['deletePost']),
    
    displayComment: function() {
      this.showComment = !this.showComment;
      return this.showComment;
    },
    // postComment: function(e) {
    //   console.log(e.target.value);
    //   axios.post(
    //     "http://localhost:3000/api/posts",
    //     { body: e.target.value },
    //     { headers: headers }
    //   );
    // },
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
</style>
