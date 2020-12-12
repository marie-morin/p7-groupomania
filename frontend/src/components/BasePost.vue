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
  <div class="post-unit">
    <BaseLike
      :item="post"
      url-endpoint="posts"
      rateMutation="ratePost"
      setMutation="setPostLikes"
    />

    <div class="post-content">
      <p class="meta">
        <router-link :to="{ name: 'Profil', params: { id: post.UserId } }">{{
          post.User.username
        }}</router-link
        >, {{ wasPublished }}.
      </p>
      <p class="title">{{ post.title }}</p>

      <div v-if="post.imageUrl" class="image">
        <img :src="post.imageUrl" :alt="post.title" class="image" />
      </div>

      <p class="text">{{ post.content }}</p>

      <div v-if="editing">
        <form enctype="multipart/form-data" @submit.prevent="updatePost">
          <label for="title">Nouveau titre</label>
          <input
            type="text"
            name="title"
            required
            v-model="updatedPost.title"
            @keyup.enter="updatePost()"
          />
          <br />

          <label for="upload">Nouvelle image</label>
          <div class="upload">
            <FormImageUpload v-on:send-imagefile="setFile" />
          </div>

          <button>Valider la modification</button>
          <button @click="editPost()">Annuler</button>
        </form>
      </div>

      <SectionComments :post="post" />

      <button v-if="isAllowed" @click="deletePost(post.id)">
        Supprimer le post
      </button>

      <button v-if="isCreator" @click="editPost()">
        Modifier votre post
      </button>
    </div>
  </div>
</template>

<style scope lang="scss">
</style>