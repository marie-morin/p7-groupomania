<script>
import { mapActions } from "vuex";
// import axios from "axios";
import BaseButton from "@/components/BaseButton";
import FormImageUpload from "@/components/FormImageUpload";

export default {
  name: "InfosUser",

  components: { BaseButton, FormImageUpload },

  props: {
    user: {
      type: Object,
      requiered: true,
    },
    isOwner: {
      type: Boolean,
      requiered: true,
    },
  },

  data() {
    return {
      file: null,
      imageUploadDisplayed: false,
      wasPosted: false,
    };
  },

  methods: {
    ...mapActions(["update"]),

    displayImageUpload() {
      return (this.imageUploadDisplayed = !this.imageUploadDisplayed);
    },

    setFile(image) {
      this.file = image;
    },

    addPicture() {
      let formData = new FormData();
      formData.append("file", this.file);

      if (formData.get("file") == null) {
        const contexte = {
          intention: "notification",
          message: "Vous devez selectionner une image !",
        };
        this.$store.commit("displayPopup", contexte);
        return;
      } else {
        const options = {
          url:
            process.env.VUE_APP_LOCALHOST_URL + `users/${this.user.id}/picture`,
          mutation: "setUser",
          data: formData,
        };
        this.update(options);
        this.wasPosted = true;
        this.imageUploadDisplayed = false;
      }
    },
  },
};
</script>

<template>
  <div class="page-content">
    <div class="infos-container">
      <div class="infos">
        <h1 v-if="isOwner">Bienvenue {{ user.firstname }} !</h1>
        <h1 v-else>{{ user.username }}</h1>

        <h3>Nom d'utilisateur :</h3>
        <p>{{ user.firstname }} {{ user.lastname }}</p>

        <h3 v-if="isOwner">Email :</h3>
        <p v-if="isOwner">{{ user.email }}</p>

        <h3>Biographie :</h3>
        <p v-if="user.bio">{{ user.bio }}</p>
        <p v-else>
          Vous n'avez pas encore ajouté de biographie à votre profil !
        </p>

        <h3 v-if="user.isAdmin">Administration :</h3>
        <p v-if="user.isAdmin">Vous êtes administrateur.</p>
      </div>

      <div class="profilPicture">
        <section v-if="user.imageUrl">
          <img :src="user.imageUrl" :alt="user.username" class="image" /> <br />
          <button @click="displayImageUpload">
            Modifier la photo de profil
          </button>
        </section>

        <section v-else>
          <button @click="displayImageUpload">
            Ajouter un photo de profil
          </button>
        </section>

        <form v-if="imageUploadDisplayed" @submit.prevent="addPicture">
          <FormImageUpload
            v-on:send-imagefile="setFile"
            :wasPosted="wasPosted"
          />
          <BaseButton>Enregistrer</BaseButton> <br />
        </form>
      </div>
    </div>
  </div>
</template>

<style scope lang="scss">
.image {
  max-width: 200px;
  max-height: 200px;
}
// h1 {
//   margin: 0;
//   color: $groupomania-red;
//   text-align: center;
//   margin-bottom: 20px;
// }
// h3 {
//   margin: 0;
//   color: $groupomania-font-blue;
// }
// p {
//   margin-top: 5px;
// }
// .infos {
//   width: 100%;
//   margin: 0 auto;
//   background-color: $groupomania-back-grey;

//   &-container {
//     margin: 0 auto;
//     padding: 30px;
//     background-color: $groupomania-back-grey;
//     border-radius: $radius;
//     border: 2px solid $groupomania-red;
//     text-align: left;
//     color: $groupomania-font-blue;

//     @media screen and(max-width: $large + 100) {
//       width: 70%;
//     }
//     @media screen and(max-width: $small) {
//       width: 90%;
//       padding: 40px 10px;
//     }
//   }
// }

// .option {
//   color: $groupomania-red;
//   text-transform: none;
// }
</style>
