<script>
import { mapGetters, mapActions } from 'vuex';
import BaseComment from "@/components/BaseComment.vue";
import BaseLike from "@/components/BaseLike.vue";

export default {
  name: "BasePost",

  components: { BaseComment, BaseLike },

  props: {
    post: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      displayComments: false,
      editing : false,
      newComment: "",
      updatedPost: {
        title: this.post.title,
        content: this.post.content,
        id: this.post.id
      },
    };
  },

  computed: { 
    ...mapGetters(['currentUser', 'allPosts', 'popup']),

    isAllowed() { return this.currentUser.isAdmin == true || this.post.userId == this.currentUser.id },

    isCreator() { return this.post.userId == this.currentUser.id },

    wasPublished() {
      const creationDate = new Date(this.post.createdAt); 
      const now = new Date()
      const timeSinceCreation = (now.getTime() - creationDate.getTime()) / (1000 * 3600 * 24);
      const daysSinceCreation = Math.round(timeSinceCreation)

      if (daysSinceCreation < 1) {
        return "aujourd'hui";
      }
      return `il y a ${daysSinceCreation} jours`;
    }
  },

  created() {
    const commentOptions = { url: process.env.VUE_APP_LOCALHOST_URL + `comments/from/${this.post.id}`, mutation: "setComments" };
    this.fetch(commentOptions);
  },

  methods: {
    ...mapActions(['fetch', 'add', 'update']),

    deletePost(id)  {
      console.log("id : ", id);

      console.log("this.post.imageUrl : ", this.post.imageUrl);

      // cloudinary.uploader.destroy('zombie', function(result) { console.log(result) });

      // result = Cloudinary::Uploader.destroy(public_id, options = {})




      // const contexte = {
      //   origin: "deletePost",
      //   intention: "confirmation",
      //   message: "Etes-vous sur de vouloir supprimer votre publication ?",
      //   options: {
      //     url: process.env.VUE_APP_LOCALHOST_URL + `posts/${id}`,
      //     mutation: "removePost",
      //     id: id,
      //   },
      // };
      // this.$store.commit("displayPopup", contexte);
    },

    displayComment() { this.displayComments = !this.displayComments },

    editPost() { this.editing = !this.editing },

    addComment() {
      if (this.newComment == "") {
        const contexte = {
          intention: "notification",
          message: "Votre commentaire est vide !",
        };
        this.$store.commit("displayPopup", contexte);
        return;
      }

      const comment = { content: this.newComment, postId: this.post.id };
      const options = {
        url: process.env.VUE_APP_LOCALHOST_URL + "comments/",
        mutation: "newComment",
        data: comment
      }
      this.add(options);
      this.newComment = "";
    },

    updatePost() {
      if (this.updatedPost.title == "" || this.updatedPost.content == "") {
        const contexte = {
          intention: "notification",
          message: "Vtre publication doit contenir un titre et du contenu !",
        };
        this.$store.commit("displayPopup", contexte);
        return;
      }
      console.log("pass");

      const options = {
        url: process.env.VUE_APP_LOCALHOST_URL + `posts/${this.updatedPost.id}`,
        mutation: "updatePost",
        data: this.updatedPost,
      }
      this.update(options);   
      this.editing = false;
    },
  }
};
</script>


<template>
  <div class="post-unit">
    <BaseLike
      :item="post"
      url-endpoint="posts"
      mutation="ratePost"
    />

    <div class="post-content">
      <p class="meta">
        <router-link :to="{ name: 'Profil', params: { id: post.UserId }}">{{ post.User.username }}</router-link>, {{ wasPublished }}.
      </p>
      <p class="title">{{ post.title }}</p>

      <div v-if="post.imageUrl" class="image">
        <img :src="post.imageUrl" :alt="post.title" class="image">
      </div>
      
      <p class="text">{{ post.content }}</p>

      <div v-if="editing">
        <label for="title">Nouveau titre</label>
        <input
          type="text"
          name="title"
          required
          v-model="updatedPost.title"
          @keyup.enter="updatePost()"
        />
        <br>

        <label for="content">Nouveau contenu</label>
        <input
          type="text"
          name="content"
          required
          v-model="updatedPost.content"
          @keyup.enter="updatePost()"
        />

        <button @click="updatePost()">Valider la modification</button>
        <button @click="editPost()">Annuler</button>
      </div>

      <div class="post-comments" @click="displayComment()">
        <font-awesome-icon
          icon="comment"
          class="icon comment"
        />
        <p>{{ post.comments.length }} commentaires</p>
      </div>

      <div
        v-show="displayComments === true"
        class="comment-container"
      >
        <div
          v-for="comment in post.comments"
          :key="comment.id"
        >
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

      <button
        v-if="isAllowed"
        @click="deletePost(post.id)"
      >
        Supprimer le post
      </button>

      <button
        v-if="isCreator"
        @click="editPost()"
      >
        Modifier votre post
      </button>

      
    </div>

  </div>
</template>


<style scope lang="scss">
.post {

  &-unit{
    // width: 100%;
    height: 100%;
    padding: 0;
    @include flexbox(flex-start, row, stretch);
    background-color: $groupomania-background;
    color: $groupomania-font-blue;
    border-radius: $radius;
    border: 1px solid $groupomania-medium-grey;
    text-align: left;
  }

  &-content {
    // width: 100%;
    padding: 5px;
  }

  &-comments {
    @include flexbox(flex-start, row, center);
    cursor: pointer;

    p {
      margin: 0 0 0 5px;
    }
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

.image{
  max-width: 200px;
  height: 200px;
}
</style>
