<script>
import { mapGetters, mapActions } from "vuex";
import formValidation from "../mixins/formValidation"
import BaseLike from "@/components/BaseLike";
import BaseAvatar from "@/components/BaseAvatar";
import BaseButton from "@/components/BaseButton";

export default {
  name: "BaseComment",

  mixins: [formValidation],

  components: { BaseLike, BaseAvatar, BaseButton },

  props: {
    comment: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      updatedComment: {
        content: this.comment.content,
        id: this.comment.id,
      },
      editing: false,
      optionsDisplayed: false,
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

    editComment() { this.editing = !this.editing },

    displayOptions() { this.optionsDisplayed = !this.optionsDisplayed },

    updateComment(e) {
      e.preventDefault();
      if (this.updatedComment.content == "") {
        const contexte = {
          intention: "alert",
          message: "Votre commentaire est vide !",
        };
        this.$store.commit("displayPopup", contexte);
        return;
      }

      if (this.contentValidation(this.updatedComment.content)) {
        return;
      }
      
      const options = {
        url: process.env.VUE_APP_LOCALHOST_URL + `comments/${this.comment.id}`,
        mutation: "updateComment",
        data: this.updatedComment,
      };
      this.update(options);
      this.editComment();
      this.updatedComment.content = "";
    }
  },
};
</script>

<template>
  <div class="comment">

    <!-- <img :src="currentUser.imageUrl" alt="currentUser.username" class="avatar"> -->
    <BaseAvatar :user="comment.User" origin="post" />

    <div class="comment__main" :class="{ hide : editing }">

      <div class="comment__content">
        <p class="comment__meta">
          <!-- <router-link :to="{ name: 'Profil', params: { id: comment.UserId } }">{{
            comment.User.username
          }}</router-link> -->
          <BaseButton
            tag="router-link"
            :to="{ name: 'Profil', params: { id: comment.UserId } }"
            isLink
          >
            {{ comment.User.username }}
          </BaseButton>
          , {{ wasPublished }}.
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


    <div  class="options relative" :class="{ hide : editing }">
        <BaseButton
          tag="button"
          @click="displayOptions()"
          isDotsBtn
        >
          <font-awesome-icon icon="ellipsis-h" />
        </BaseButton>

        <!-- <div @click="displayOptions" @keydown.enter="displayOptions" class="options__dots" tabindex="0">
          <font-awesome-icon icon="ellipsis-h" />
        </div> -->

        <div v-show="optionsDisplayed" class="options__dropdown options__comment">

          <BaseButton
            v-if="isAllowed"
            tag="button"
            @click="deleteComment(comment.id), displayOptions()"
            isOptionBtn
          >
            <font-awesome-icon icon="trash-alt" />
            Supprimer le commentaire
          </BaseButton>

          <!-- <button @click="deleteComment(comment.id)" v-if="isAllowed" class="options__button">
            <font-awesome-icon icon="trash-alt" />
            Supprimer le commentaire
          </button> -->

          <BaseButton
            v-if="isCreator"
            tag="button"
            @click="editComment(), displayOptions()"
            isOptionBtn
          >
            <font-awesome-icon icon="pencil-alt" />
            Modifier votre commentaire
          </BaseButton>
          <!-- <button @click="editComment()" v-if="isCreator" class="options__button">
            <font-awesome-icon icon="pencil-alt" />
            Modifier votre commentaire
          </button> -->
        </div>
      </div>

      <form
        v-if="editing"
        class="comment__edit">
        
        <input
          type="text"
          required
          v-model="updatedComment.content"
          @keydown.enter="updateComment"
          placeholder="Modifier votre commentaire..."
          class="comment__edit"
        />

        <BaseButton
          v-if="isCreator"
          tag="button"
          @click.prevent="editComment()"
          isLink
        >
          Annuler
        </BaseButton>

        <!-- <button @click="editComment()">Annuler</button> -->
      </form>
  </div>
</template>

<style scope lang="scss">
.comment {
  @include flexbox(flex-start, row, center);
  margin: $marged-centered-margin;
  text-align: left;

  @media screen and (max-width: $break-small) {
    @include flexbox(center, column, flex-start);
  }

  &__main {
    max-width: 90%;
    @include flexbox(space-between, row, center);
    margin-right: 0.5rem;
    padding: $base-padding;
    background-color: $base-color;
    border-radius: $medium-radius;

    @media screen and (max-width: $break-small) {
      max-width: 100%;
      @include flexbox(flex-start, column, flex-start);
      margin-right: 0;
      margin-bottom: 0.5rem;
    }
  }

  &__meta {
    // position: relative;
    margin: 0;
    color: $police-color;

    a {
      color: inherit;
      text-decoration: none;

      &:hover {
        color: darken($color: $success-color, $amount: 10);
        text-decoration: underline;
      }
    }
  }

  &__content {
    max-width: 90%;
    word-wrap: break-word ;
  }

  &__likes {
    padding: 1rem 0 1rem 2rem;

    @media screen and (max-width: $break-small) {
      padding: 0;
    }
  }

  &__edit {
    width: 100%;
    @include flexbox(flex-end, row, center);
    color: inherit;
    font-size: inherit;
    font-family: inherit;

    input {
      background-color: $base-color;
      border-radius: $medium-radius;
      border: none;
      padding: $base-padding;
    }
  }
}

.hide {
  display: none;
}

.relative {
  position: relative;
}
</style>