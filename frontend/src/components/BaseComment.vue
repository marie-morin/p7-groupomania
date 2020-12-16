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
  <div class="comment">

    <img :src="currentUser.imageUrl" alt="currentUser.username" class="comment__userimage">

    <div class="comment__main">

      <div class="comment__content">
        <p class="comment__meta">
          <router-link :to="{ name: 'Profil', params: { id: comment.UserId } }">{{
            comment.User.username
          }}</router-link
          >, {{ wasPublished }}.
        </p>

        {{ comment.content }}
      </div>

      <div class="comment__likes">
        <BaseLike
          :item="comment"
          url-endpoint="comments"
          rateMutation="rateComment"
          setMutation="setCommentLikes"
        />
      </div>

    </div>


    <div class="comment__options">
        <div class="comment__dots">
          <font-awesome-icon icon="ellipsis-h" />
        </div>

        <div class="comment__buttons">
          <!-- <button @click="deleteComment(comment.id)" v-if="isAllowed">
            <font-awesome-icon icon="trash-alt" />
            Supprimer le commentaire
          </button>
          <button @click="editComment()" v-if="isCreator">
            <font-awesome-icon icon="pencil-alt" />
            Modifier votre commentaire
          </button> -->
        </div>
      </div>

      <!-- <div v-if="editing">
        <input
          type="text"
          required
          v-model="updatedComment"
          @keyup.enter="updateComment()"
        />
        <button @click="editComment()">Annuler</button>
      </div> -->
  </div>
</template>

<style scope lang="scss">
.comment {
  margin: 10px 0;
  // background-color: lightsalmon;
  text-align: left;
  @include flexbox(flex-start, row, flex-start);

  &__userimage {
    width: 35px;
    height: 35px;
    margin-right: 10px;
    border-radius: 50%;
  }

  &__main {
    @include flexbox(space-between, row, center);
    background-color: rgb(240, 240, 240);
    padding: 5px 15px;
    border-radius: 15px;
  }


  &__meta {
    margin: 0;

    a {
    text-decoration: none;
    color: inherit;
    }
  }

  &__dots {
    @include flexbox(center, row, center);
    width: 35px;
    height: 35px;
    margin: 0 15px;
    border-radius: 50%;
    font-size: 1.3rem;
    color: rgb(240, 240, 240);
    cursor: pointer;

    &:hover {
      box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
    }

    &--active {
      box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
    }
  }
}
</style>