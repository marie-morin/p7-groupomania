<template>
  <div class="post-unit">

    <!-- Partie likes du bloc Post -->
    <div class="post-likes">
      <p class="likes">{{ post.likes.length }}</p>
      <font-awesome-icon @click="like()" v-bind:class="{ liked: wasLiked }" class="icon up" icon="arrow-up" />
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

        <button @click="updatePost()">Valider la modification</button>
        <button @click="editPost()">Annuler</button>
      </div>

      <div class="post-comments" @click="displayComment()">
        <font-awesome-icon class="icon comment" icon="comment" />
        <p>{{ post.comments.length }} commentaires</p>
      </div>

      <div v-show="showComment === true" class="comment-container">
        <div v-for="comment in post.comments" :key="comment.id">
          <Comment :comment="comment" />
        </div>
        <input type="text" v-model="newComment" @keyup.enter="addComment()" placeholder="Ajouter un commentaire..."/>
      </div> 

      <button @click="deletePost(post.id)" v-if="isAllowed">Supprimer le post</button>
      <button @click="editPost()" v-if="isCreator">Modifier votre post</button>

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

  data() {
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
      return this.currentUser.isAdmin == true || this.post.userId == this.currentUser.id
    },

    isCreator() {
      return this.post.userId == this.currentUser.id
    }
  },

   created() {
    const commentOptions = {
      url: `http://localhost:3000/api/comments/from/${this.post.id}`,
      mutation: "setComments",
    };
    this.fetch(commentOptions);

    const likesOptions = {
      url: `http://localhost:3000/api/posts/${this.post.id}/like`,
      mutation: "setPostLikes",
    };
    this.fetch(likesOptions);
  },

  methods: {
    ...mapActions(['delete', 'fetch', 'add', 'update', 'rate']),

    deletePost(id) {
      const options = {
        url: `http://localhost:3000/api/posts/${id}`,
        mutation: "removePost",
        id: id
      }
      this.delete(options);
    },

    displayComment() { this.showComment = !this.showComment },

    editPost() { this.editing = !this.editing },

    addComment() {
      const comment = {
        content: this.newComment,
        postId: this.post.id
      };
      const options = {
        url: "http://localhost:3000/api/comments/",
        mutation: "newComment",
        data: comment
      }
      this.add(options);
      this.newComment = "";
    },

    updatePost() {
      const options = {
        url: `http://localhost:3000/api/posts/${this.updatedPost.id}`,
        mutation: "updatePost",
        data: this.updatedPost,
      }
      this.update(options);   
      this.editing = false;
    },

    like() {   
      const options = {
        url: `http://localhost:3000/api/posts/like`,
        mutation: "setPostRate",
        id: this.post.id
      };
      this.rate(options);

    this.wasLiked = !this.wasLiked;
    },
  }
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
