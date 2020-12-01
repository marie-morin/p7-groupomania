<template>
  <div class="comment-unit">
    <div class="comment-likes">
      <p class="likes">{{ comment.likes.length }}</p>
      <font-awesome-icon @click="like()" v-bind:class="{ liked: wasLiked }" class="icon up" icon="arrow-up" />
    </div>

      {{ comment.content }} par {{ comment.User.username }}, {{ wasPublished }}. <br/>

      <div v-if="editing">
        <input type="text" v-model="updatedComment" @keyup.enter="updateComment()" required>
        <button @click="editComment()">Annuler</button>
      </div>


      <button @click="deleteComment(comment.id)" v-if="isAllowed">Supprimer le commentaire</button>
      <button @click="editComment()" v-if="isCreator">Modifier votre commentaire</button>

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
      updatedComment: "",
      editing : false,
      wasLiked: false,
    };
  },

  computed: { 
    ...mapGetters(['currentUser']),

    isAllowed() { return this.currentUser.isAdmin == true || this.comment.userId == this.currentUser.id },

    isCreator() { return this.comment.userId == this.currentUser.id },

    wasPublished() {
      const creationDate = new Date(this.comment.createdAt); 
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
    const likesOptions = { url: `http://localhost:3000/api/comments/${this.comment.id}/like`, mutation: "setCommentLikes" };
    this.fetch(likesOptions).then(() => {
      this.comment.likes.forEach(like => {
        if (like.UserId === this.currentUser.id) {
          return this.wasLiked = true;
        }
      });
    });    
  },

  methods: {
    ...mapActions(['fetch', 'add', 'update', 'rate']),

    deleteComment(id) {
      const contexte = {
        origin: "deleteComment",
        intention: "confirmation",
        message: "Etes-vous sur de vouloir supprimer votre commentaire ?",
        options: {
          url: `http://localhost:3000/api/comments/${id}`,
          mutation: "removeComment",
          id: id
        },
      };
      this.$store.commit("displayPopup", contexte);
    },

    editComment() { this.editing = !this.editing },

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
        url: `http://localhost:3000/api/comments/${this.comment.id}`,
        mutation: "updateComment",
        data: this.updatedComment,
      }
      this.update(options);      
      this.updatedComment = "";

      const contexte = { message: "Votre commentaire à été modifié !", intention: "notification" };
      this.$store.commit('displayPopup', contexte);
    },

    like() {   
      const options = {
        url: `http://localhost:3000/api/comments/like`,
        mutation: "rateComment",
        id: this.comment.id,
        user: this.currentUser.id
      };
      this.rate(options);
      this.wasLiked = !this.wasLiked;

      let contexte;
      if (this.wasLiked) {
        contexte = { message: "Vous avez liker un commentaire !", intention: "notification" };
      } else {
        contexte = { message: "Vous avez retiré votre like !", intention: "notification" };
      }
      this.$store.commit('displayPopup', contexte);
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
