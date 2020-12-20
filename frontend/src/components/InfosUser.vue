<script>
import { mapActions, mapGetters } from "vuex";
import BaseButton from "@/components/BaseButton";
import FormImageUpload from "@/components/FormImageUpload";
import FormProfilUpdate from "@/components/FormProfilUpdate";
import FormPasswordUpdate from "@/components/FormPasswordUpdate";
import BaseAvatar from "@/components/BaseAvatar";

export default {
  name: "InfosUser",

  components: {
    BaseButton,
    FormImageUpload,
    FormProfilUpdate,
    FormPasswordUpdate,
    BaseAvatar,
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
          intention: "alert",
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
      <div class="userinfos__content">
        <BaseAvatar :user="user" origin="profil" />

        <div class="userinfos__meta">
          <p>
            <span class="userinfos__name">
              {{ user.firstname }} {{ user.lastname }}
            </span> 
            <span v-if="isOwner">
              ({{ user.email }})
            </span>
          </p>
          <p v-if="user.isAdmin">Vous êtes administrateur.</p>
          <p v-if="user.bio">" {{ user.bio }} "</p>
          <p v-else>Aucun biographie n'a été renseignée !</p>
        </div>
      </div>

      <div>
        <!-- Ajout d'une image -->
        <div
          v-if="imageUploadDisplayed"
          @submit.prevent="addPicture"
          class="popupform"
        >
          <form class="form popupform__form">
            <font-awesome-icon
              icon="times"
              @click="displayImageUpload"
              class="close-cross"
            />
            <h2 class="form__title">Modifiez votre photo de profil :</h2>
            <FormImageUpload
              v-on:send-imagefile="setFile"
              :wasPosted="wasPosted"
            />
            <BaseButton>Enregistrer</BaseButton>
            <BaseButton @click="displayImageUpload">Annuler</BaseButton>
          </form>
        </div>

        <!-- Modification du profil -->
        <div
          v-show="profilFormDisplayed"
          class="popupform"
          v-if="isOwner"
        >
          <FormProfilUpdate
            v-if="isOwner"
            @display-form="displayProfilForm()"
            class="popup-form__form"
          />
        </div>

        <!-- Modification du mot de passe -->
        <div
          v-show="passwordFormDisplayed"
          v-if="isOwner"
          class="popupform"
        >
          <FormPasswordUpdate
            v-if="isOwner"
            @display-form="displayPasswordFrom()"
            class="popup-form__form"
          />
        </div>
      </div>

      <div class="options">
        <div
          class="options__dots"
          @click="displayOptions"
          @keydown.enter="displayOptions"
          tabindex="0"
        >
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

      
    </div>
</template>

<style scope lang="scss">
.userinfos {
  // width: 70%;
  @include flexbox(space-between, row, flex-start);
  margin: $marged-centered-margin;
  padding: 3rem;

  color: $police-color;
  box-shadow: $shadow;
  border-radius: $small-radius;

  @media screen and (max-width: $break-tablet) {
      @include flexbox(center, column, center);
    }

  &__content {
    @include flexbox(flex-start, row, center);

    @media screen and (max-width: $break-tablet) {
      @include flexbox(center, column, center);
    }
  }

  &__meta {
    text-align: left;
    
    @media screen and (max-width: $break-tablet) {
      text-align: center;
    }
  }

  &__name {
    font-size: 3rem;
  }
}
</style>