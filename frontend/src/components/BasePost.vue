<script>
import { mapGetters, mapActions } from "vuex";
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

  props: {
    post: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      editing: false,
      file: null,
      optionsDisplayed: false,
      updatedPost: {
        title: this.post.title,
        imageUrl: this.post.imageUrl,
        id: this.post.id,
      },
    };
  },

  computed: {
    ...mapGetters(["currentUser", "popup"]),

    isAllowed() {
      return (
        this.currentUser.isAdmin == true ||
        this.post.userId == this.currentUser.id
      );
    },

    isCreator() {
      return this.post.userId == this.currentUser.id;
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

    editPost() {
      this.editing = !this.editing;
    },

    setFile(image) {
      this.file = image;
    },

    displayOptions() { this.optionsDisplayed = !this.optionsDisplayed },

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
      const options = {
        url: process.env.VUE_APP_LOCALHOST_URL + `posts/${this.updatedPost.id}`,
        mutation: "updatePost",
        data: formData,
      };
      this.update(options);
      this.editing = false;
    },
  },
};
</script>

<template>
  <div class="post">

    <div class="post__header">
      <div class="post__meta">
        <!-- <img :src="post.imageUrl" alt="currentUser.username" class="avatar"> -->
        <BaseAvatar :user="post.User" origin="post" />
        <p>
          <!-- <router-link :to="{ name: 'Profil', params: { id: post.UserId } }">{{
            post.User.username
          }}</router-link> -->
          <BaseButton
            tag="router-link"
            :to="{ name: 'Profil', params: { id: post.UserId } }"
            isLink
          >
            {{ post.User.username }}
          </BaseButton>
          , {{ wasPublished }}.
        </p>
      </div>



      <div class="options">

        <BaseButton
          tag="button"
          @click="displayOptions()"
          isDotsBtn
        >
          <font-awesome-icon icon="ellipsis-h" />
        </BaseButton>
        
<!-- 
        <div class="options__dots" @click="displayOptions" @keydown.enter="displayOptions" tabindex="0">
          <font-awesome-icon icon="ellipsis-h" />
        </div> -->

        <div v-show="optionsDisplayed" class="options__dropdown">
          <BaseButton
            v-if="isAllowed"
            tag="button"
            @click="deletePost(post.id)"
            isOptionBtn
          >
            <font-awesome-icon icon="trash-alt" />
            Supprimer le post
          </BaseButton>

          <!-- <button v-if="isAllowed" @click="deletePost(post.id)" class="options__button">
            <font-awesome-icon icon="trash-alt" />
            Supprimer le post
          </button> -->

          <BaseButton
            v-if="isCreator"
            tag="button"
            @click="editPost()"
            isOptionBtn
          >
            <font-awesome-icon icon="pencil-alt" />
            Modifier votre post
          </BaseButton>

          <!-- <button v-if="isCreator" @click="editPost()" class="options__button">
            <font-awesome-icon icon="pencil-alt" />
            Modifier votre post
          </button> -->
        </div>
      </div>
    </div>

    <!-- Contenu du post -->
    <div class="post__content">
      <h2 class="post__title">{{ post.title }}</h2>
      <div class="post__image">
        <img v-if="post.imageUrl" :src="post.imageUrl" :alt="post.title" />
      </div>
    </div>

    <!-- Affichage des likes -->
    <BaseLike
      :item="post"
      url-endpoint="posts"
      rateMutation="ratePost"
      setMutation="setPostLikes"
    />

    <!-- Section commentaires -->
    <SectionComments :post="post" />

    <!-- Formulaire de modification du post -->
      <form v-if="editing" enctype="multipart/form-data" @submit.prevent="updatePost">
        <label for="title">Nouveau titre</label>
        <input
          type="text"
          name="title"
          required
          v-model="updatedPost.title"
          @keyup.enter="updatePost()"
        />

        <label for="upload">Nouvelle image</label>
        <FormImageUpload v-on:send-imagefile="setFile" />

        <button>Valider la modification</button>
        <button @click="editPost()">Annuler</button>
      </form>      
  </div>
</template>

<style scope lang="scss">
.post {
  // width: 70%;
  margin: $marged-centered-margin;

  background-color: $clear-color;
  color: $police-color;

  box-shadow: $shadow;
  border-radius: $small-radius;

  &__header {
    @include flexbox(space-between, row, center);
    padding: $base-padding;
  }

  &__meta {
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
    padding: 0 2rem; 
  }

  &__content {
    text-align: left;
  }

  &__image {
    height: 50rem;
    background-color: $secondary-color;

    img {
      max-width: 100%;
      height: 100%;
      display: block;
      margin: $centered-margin;
    }
  }
}
</style>