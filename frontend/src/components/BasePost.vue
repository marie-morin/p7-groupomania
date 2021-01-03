<script>
import { mapGetters, mapActions } from "vuex";
import formValidation from "../mixins/formValidation"
import FormImageUpload from "@/components/FormImageUpload";
import SectionComments from "@/components/SectionComments";
import BaseLike from "@/components/BaseLike";
import BaseButton from "@/components/BaseButton";
import BaseAvatar from "@/components/BaseAvatar";

export default {
  name: "BasePost",

  components: {
    BaseLike,
    FormImageUpload,
    SectionComments,
    BaseAvatar,
    BaseButton
  },

  mixins: [formValidation],

  props: {
    post: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      classname: "outside-click-exclude-" + this.post.id,
      editing: false,
      file: null,
      optionsDisplayed: false,
      wasPosted: false,
      updatedPost: {
        title: this.post.title,
        imageUrl: this.post.imageUrl,
        id: this.post.id,
      },
    };
  },

  computed: {
    ...mapGetters(["currentUser", "popup"]),

    isCreator() { return this.post.userId == this.currentUser.id },

    isAllowed() {
      return (
        this.currentUser.isAdmin == true ||
        this.post.userId == this.currentUser.id
      );
    },

    wasPublished() {
      const creationDate = new Date(this.post.createdAt);
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
    ...mapActions(["fetch", "add", "update"]),

    setFile(image) { this.file = image },

    editPost() { this.editing = !this.editing },

    displayOptions() { this.optionsDisplayed = !this.optionsDisplayed },

    deletePost(id) {
      const contexte = {
        origin: "deletePost",
        intention: "confirmation",
        message: "Etes-vous sur de vouloir supprimer votre publication ?",
        options: {
          url: process.env.VUE_APP_LOCALHOST_URL + `posts/${id}`,
          mutation: "removePost",
          id: id,
        },
      };
      this.$store.commit("displayPopup", contexte);
    },

    updatePost() {
      let formData = new FormData();
      formData.append("content", JSON.stringify(this.updatedPost));

      if (this.file != null) {
        formData.append("file", this.file);

        if (this.updatedPost.title == "" || formData.get("file") == null) {
          const contexte = {
            intention: "alert",
            message: "Votre publication doit contenir un titre et une image !",
          };
          this.$store.commit("displayPopup", contexte);
          return;
        }
      } else {
        if (this.updatedPost.title == "") {
          const contexte = {
            intention: "alert",
            message: "Votre publication doit contenir un titre et une image !",
          };
          this.$store.commit("displayPopup", contexte);
          return;
        } 
      }

      if (!this.contentValidation(this.updatedPost.title)) {
        return;
      }

      const options = {
        url: process.env.VUE_APP_LOCALHOST_URL + `posts/${this.updatedPost.id}`,
        mutation: "updatePost",
        data: formData,
      };
      this.update(options);
      this.wasPosted = true;
      this.editing = false;
      this.file = null;
    },

    onClose(){
      this.optionsDisplayed = false;
      this.editing = false;
    },
  },
};
</script>


<template>
  <div class="post">
    <div class="post__header">

      <div class="post__meta">
        <BaseAvatar :user="post.User" origin="post" />
        <p>
          <BaseButton :to="{ name: 'Profil', params: { id: post.UserId } }" tag="router-link" isLink>
            {{post.User.username}}</BaseButton>, {{ wasPublished }}.
        </p>
      </div>

      <div v-if="isCreator || isAllowed" class="options">
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
          class="options__dropdown popup-box"
          v-outside-click="{ exclude: [classname], handler: onClose }"
        >
          <BaseButton
            v-if="isAllowed"
            @click="deletePost(post.id), displayOptions()"
            tag="button"
            isOptionBtn
          >
            <font-awesome-icon icon="trash-alt" />
            Supprimer le post
          </BaseButton>

          <BaseButton
            v-if="isCreator"
            @click="editPost(), displayOptions()"
            tag="button"
            isOptionBtn
            class="openPostUpdate"
          >
            <font-awesome-icon icon="pencil-alt" />
            Modifier votre post
          </BaseButton>
        </div>
      </div>
    </div>

    <div class="post__content">
      <h2 class="post__title">{{ post.title }}</h2>
      <div class="post__image">
        <img v-if="post.imageUrl" :src="post.imageUrl" :alt="post.title" />
      </div>
    </div>

    <div class="post__likes">
      <BaseLike
        :item="post"
        url-endpoint="posts"
        rateMutation="ratePost"
        setMutation="setPostLikes"
      />
    </div>

    <SectionComments :post="post" />

    <!-- Formulaire popup pour modifier son post -->
    <div v-show="editing" class="popupform">
      <form
        v-if="editing"
        @submit.prevent="updatePost"
        enctype="multipart/form-data"
        class="popup-form__form form"
        v-outside-click="{ exclude: ['openPostUpdate'], handler: onClose }"
      >
        <!-- Croix pour fermer le formulaire -->
        <BaseButton @click="editPost()" tag="button" isCloseBtn>
          <font-awesome-icon icon="times" />
        </BaseButton>

        <div class="form__group">
          <input
            type="text"
            name="title"
            required
            placeholder="Modifier votre title"
            v-model="updatedPost.title"
            @keyup.enter="updatePost()"
            class="form__field"
          />
          <label for="title" class="form__label">Modifier votre titre</label>
        </div>

        <label for="upload">Nouvelle image</label>

        <FormImageUpload @send-imagefile="setFile" :wasPosted="wasPosted" inputfile="postUpdate" />

        <BaseButton tag="button" nativeType="submit" isGenericBtn>
          Valider la modification
        </BaseButton>
        <BaseButton @click="editPost()" tag="button" isCancelBtn>
          Annuler
        </BaseButton>
      </form>   
    </div>
  </div>
</template>


<style scope lang="scss">
.post {
  position: relative;
  margin: $marged-centered-margin;

  background-color: $clear-color;
  color: $police-color;

  box-shadow: $shadow;
  border-radius: $small-radius;

  &__header {
    @include flexbox(space-between, row, center);
    padding: $base-padding;

    @media screen and (max-width: $break-small) {
      @include flexbox(flex-start, column-reverse, flex-start);
    }
  }

  &__meta {
    text-align: left;
    @include flexbox(flex-start, row, center);

    a {
      color: inherit;
      text-decoration: none;

      &:hover {
        color: darken($color: $success-color, $amount: 10);
        text-decoration: underline;
      }
    }
  }

  &__title {
    margin: 0 0 2rem 0;
    padding-left: 2rem; 
  }

  &__content {
    text-align: left;
  }

  &__image {
    max-height: 50rem;
    @include flexbox(center, row, center);
    background-color: $secondary-color;
    text-align: center;

    img {
      max-width: 100%;
      max-height: 50rem;
      object-fit: cover;
    }
  }

  &__likes {
    padding: 1rem 0 0 1.5rem;
  }
}
</style>