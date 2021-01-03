<script>
import { mapGetters, mapActions } from "vuex";
import formValidation from "../mixins/formValidation"
import BaseLike from "@/components/BaseLike";
import BaseAvatar from "@/components/BaseAvatar";
import BaseButton from "@/components/BaseButton";

export default {
  name: "BaseComment",

  components: { BaseLike, BaseAvatar, BaseButton },

  mixins: [formValidation],

  props: {
    comment: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      classname: "outside-click-exclude-" + this.comment.id,
      editing: false,
      optionsDisplayed: false,
      updatedComment: {
        content: this.comment.content,
        id: this.comment.id,
      },
    };
  },

  computed: {
    ...mapGetters(["currentUser"]),

    isCreator() { return this.comment.userId == this.currentUser.id },

    isAllowed() {
      return (
        this.currentUser.isAdmin == true ||
        this.comment.userId == this.currentUser.id
      );
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
    ...mapActions(["update"]),

    editComment() { this.editing = !this.editing },

    displayOptions() { this.optionsDisplayed = !this.optionsDisplayed },

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

      if (!this.contentValidation(this.updatedComment.content)) {
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
    },

    onClose(){
      this.optionsDisplayed = false;
    },
  },
};
</script>


<template>
  <div class="comment">
    <BaseAvatar :user="comment.User" origin="post" />

    <div class="comment__main" :class="{ hide : editing }">
      <div class="comment__content">
        <p class="comment__meta">
          <BaseButton :to="{ name: 'Profil', params: { id: comment.UserId } }" tag="router-link" isLink>
          {{comment.User.username}}</BaseButton>, {{ wasPublished }}.
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

    <div v-if="isCreator || isAllowed" class="options relative" :class="{ hide : editing }">
      <!-- Bouton ... pour afficher les options -->
      <BaseButton
        @click="displayOptions()"
        @keydown.enter="displayOptions()"
        tag="button"
        isDotsBtn
        aria-label="Options"
        :class="classname"
      >
        <font-awesome-icon icon="ellipsis-h" />
      </BaseButton>

      <!-- Div options -->
      <div
        v-show="optionsDisplayed"
        class="options__dropdown options__comment"
        v-outside-click="{ exclude: [classname], handler: onClose }"
      >
        <BaseButton
          v-if="isAllowed"
          @click="deleteComment(comment.id), displayOptions()"
          tag="button"
          isOptionBtn
        >
          <font-awesome-icon icon="trash-alt" />
          Supprimer le commentaire
        </BaseButton>

        <BaseButton
          v-if="isCreator"
          @click="editComment(), displayOptions()"
          tag="button"
          isOptionBtn
        >
          <font-awesome-icon icon="pencil-alt" />
          Modifier votre commentaire
        </BaseButton>
      </div>
    </div>

    <!-- Formulaire de modification d'un commentaire -->
    <form v-if="editing" class="comment__edit">
      <input
        type="text"
        required
        placeholder="Modifier votre commentaire..."
        v-model="updatedComment.content"
        @keydown.enter="updateComment"
        class="comment__edit"
      />

      <BaseButton
        v-if="isCreator"
        @click.prevent="editComment()"
        tag="button"
        isLink
      >
        Annuler
      </BaseButton>
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