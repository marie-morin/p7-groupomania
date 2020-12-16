<script>
import { mapGetters, mapActions } from "vuex";
import FormImageUpload from "@/components/FormImageUpload";
import SectionComments from "@/components/SectionComments";
import BaseLike from "@/components/BaseLike";

export default {
  name: "BasePost",

  components: { BaseLike, FormImageUpload, SectionComments },

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

    updatePost() {
      let formData = new FormData();
      formData.append("content", JSON.stringify(this.updatedPost));

      if (this.file != null) {
        formData.append("file", this.file);

        if (this.updatedPost.title == "" || formData.get("file") == null) {
          const contexte = {
            intention: "notification",
            message: "Votre publication doit contenir un titre et une image !",
          };
          this.$store.commit("displayPopup", contexte);
          return;
        }
      } else {
        if (this.updatedPost.title == "") {
          const contexte = {
            intention: "notification",
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
        <img :src="post.imageUrl" alt="currentUser.username" class="welcome__image">
        <p>
          <router-link :to="{ name: 'Profil', params: { id: post.UserId } }">{{
            post.User.username
          }}</router-link
          >, {{ wasPublished }}.
        </p>
      </div>

      <div class="post__options">
        <div class="post__dots">
          <font-awesome-icon icon="ellipsis-h" />
        </div>

        <!-- <div class="post__buttons">
          <button v-if="isAllowed" @click="deletePost(post.id)">
            <font-awesome-icon icon="trash-alt" />
            Supprimer le post
          </button>
          <button v-if="isCreator" @click="editPost()">
            <font-awesome-icon icon="pencil-alt" />
            Modifier votre post
          </button>
        </div> -->
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
  position: relative;
  width: 70%;
  margin: 20px auto;
  border-radius: 3px;
  box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
  // background-color: lightpink;
  background-color: #fff;
  // background-color: #e2e7eb;
  color: $gray;

  &__header {
    @include flexbox(space-between, row, center);
    padding: 5px 20px;
  }

  &__meta {
    @include flexbox(flex-start, row, center);

    img {
      width: 35px;
      height: 35px;
      margin-right: 10px;
      border-radius: 50%;
    }

    a {
      text-decoration: none;
    }
  }

  &__dots {
    @include flexbox(center, row, center);
    width: 35px;
    height: 35px;
    margin: 0 15px;
    border-radius: 50%;
    font-size: 1.3rem;
    color: inherit;
    cursor: pointer;

    &:hover {
      box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
    }

    &--active {
      box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
    }
  }

  &__content {
    text-align: left;
  }

  &__title {
    padding-left: 20px; 
    font-size: 18px;
  }

  &__image {
    height: 500px;
    background-color: rgb(36, 35, 35);


    img {
      display: block;
      margin: 0 auto;
      max-width: 100%;
      height: 100%;
    }
  }

}
// &__buttons {
//   position: absolute;
//   padding: 15px;
//   border-radius: 3px;
//   background-color: #fff;
//   @include flexbox(flex-start, column, center);

//   button {
//     @include flexbox(flex-start, row, center);
//     border: none;
//     background-color: transparent;
//     cursor: pointer;
//   }
// }

// padding: 50px 50px;
// text-align: left;

// @media screen and (max-width: $small + 100) {
//   width: 85%
// }

// @media screen and (max-width: $x-small + 100) {
//   width: 90%;
// }
</style>