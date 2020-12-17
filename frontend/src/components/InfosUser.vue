<script>
import { mapActions, mapGetters } from "vuex";
// import axios from "axios";
import BaseButton from "@/components/BaseButton";
import FormImageUpload from "@/components/FormImageUpload";
import FormProfilUpdate from "@/components/FormProfilUpdate";
import FormPasswordUpdate from "@/components/FormPasswordUpdate";

export default {
  name: "InfosUser",

  components: {
    BaseButton,
    FormImageUpload,
    FormProfilUpdate,
    FormPasswordUpdate
  },

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
      isAdmin: false,
      file: null,

      optionsDisplayed: false,
      imageUploadDisplayed: false,
      profilFormDisplayed: false,
      passwordFormDisplayed: false,
      wasPosted: false,
    };
  },

  computed: { ...mapGetters(["currentUser"]) },

  created() {
    if (this.currentUser.isAdmin == true) {
      this.isAdmin = true;
    }
  },

  methods: {
    ...mapActions(["update"]),

    displayImageUpload() {
      return (this.imageUploadDisplayed = !this.imageUploadDisplayed);
    },

    setFile(image) { this.file = image },

    displayOptions() { 
      return (this.optionsDisplayed = !this.optionsDisplayed);
    },

    displayProfilForm() {
      return (this.profilFormDisplayed = !this.profilFormDisplayed);
    },

    displayPasswordFrom() {
      return (this.passwordFormDisplayed = !this.passwordFormDisplayed);
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

    deleteProfil() {
      const contexte = {
        origin: "deleteProfil",
        intention: "confirmation",
        message: "Voulez-vous vraiment supprimer votre compte ?",
        options: {
          url:
            process.env.VUE_APP_LOCALHOST_URL +
            `users/${this.$route.params.id}`,
          mutation: "removeUser",
          id: this.$route.params.id,
        },
      };
      this.$store.commit("displayPopup", contexte);
    },
  },
};
</script>

<template>
  <div class="userinfos">

    <div v-if="user.imageUrl" class="userinfos__profilpicture">
      <img :src="user.imageUrl" :alt="user.username" class="userinfos__image"/>
    </div>

    <div class="userinfos__meta">
      <p class="userinfos__name">{{ user.firstname }} {{ user.lastname }}</p>
      <p v-if="isOwner">{{ user.email }}</p>
      <p v-if="user.isAdmin">Vous êtes administrateur.</p>
      <p v-if="user.bio">" {{ user.bio }} "</p>
      <p v-else>
        Aucun biographie n'a été renseignée !
      </p>
    </div>

    <div class="options">
      <div class="options__dots" @click="displayOptions">
        <font-awesome-icon icon="ellipsis-h" />
      </div>

      <div v-show="optionsDisplayed" class="options__dropdown">
        <button v-if="user.imageUrl" @click="displayImageUpload" class="options__button">
          <font-awesome-icon icon="camera" />
          Modifier la photo de profil
        </button>

        <button v-else @click="displayImageUpload" class="options__button">
          <font-awesome-icon icon="camera" />
          Ajouter une photo de profil
        </button>

        <button v-if="user.imageUrl" class="options__button">
          <font-awesome-icon icon="trash-alt" />
          Supprimer ma photo de profil
        </button>

        <button v-if="isOwner" @click="displayProfilForm" class="options__button">
          <font-awesome-icon icon="pencil-alt" />
          Modifier mon profil
        </button>

        <button v-if="isOwner" @click="displayPasswordFrom" class="options__button">
          <font-awesome-icon icon="lock" />
          Modifier mon mot de passe
        </button>

        <button v-if="isOwner || isAdmin" @click="deleteProfil" class="options__button">
          <font-awesome-icon icon="trash-alt" />
          Supprimer mon profil
        </button>
      </div>
    </div>
    
    <div>
      <!-- Ajout d'une image -->
      <form v-if="imageUploadDisplayed" @submit.prevent="addPicture">
        <FormImageUpload
          v-on:send-imagefile="setFile"
          :wasPosted="wasPosted"
        />
        <BaseButton>Enregistrer</BaseButton> <br />
      </form>

      <!-- Modification du profil -->
      <FormProfilUpdate
        v-if="isOwner"
        v-show="profilFormDisplayed"
        @display-form="displayProfilForm()"
      />

      <!-- Modification du mot de passe -->
      <FormPasswordUpdate
      v-if="isOwner"
      v-show="passwordFormDisplayed"
      @display-form="displayPasswordFrom()"
    />


    </div>
  </div>
</template>

<style scope lang="scss">
.userinfos {
  @include flexbox(flex-start, row, flex-start);
  // background-color: lightsteelblue;
  width: 70%;
  margin: 20px auto;
  padding: 30px;
  border-radius: 3px;
  box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
  color: grey;

  &__image {
    width: 200px;
    height: 200px;
    margin: 20px 40px;
    border-radius: 50%;
  }

  &__meta {
    text-align: left;
  }

  &__name {
    font-size: 30px;
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
}
.image {
  max-width: 200px;
  max-height: 200px;
}
</style>
