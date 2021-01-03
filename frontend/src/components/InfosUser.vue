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
      classname: "outside-click-exclude-" + this.user.id,
      isAdmin: false,
      file: null,
      optionsDisplayed: false,
      imageUploadDisplayed: false,
      profilFormDisplayed: false,
      passwordFormDisplayed: false,
      wasPosted: false,
    };
  },

  computed: mapGetters(["currentUser"]),

  created() {
    if (this.currentUser.isAdmin == true) {
      this.isAdmin = true;
    }
  },

  methods: {
    ...mapActions(["update"]),

    setFile(image) { this.file = image },

    displayOptions() { return this.optionsDisplayed = !this.optionsDisplayed },

    displayImageUpload() { return this.imageUploadDisplayed = !this.imageUploadDisplayed },

    displayProfilForm() { return this.profilFormDisplayed = !this.profilFormDisplayed },

    displayPasswordFrom() { return this.passwordFormDisplayed = !this.passwordFormDisplayed },

    addPicture() {
      let formData = new FormData();
      formData.append("file", this.file);

      if (this.file == null) {
        console.log("pass");
        const contexte = {
          intention: "alert",
          message: "Vous devez selectionner une image !",
        };
        this.$store.commit("displayPopup", contexte);
        return;
      } else {
        const options = {
          url:
            process.env.VUE_APP_LOCALHOST_URL + `users/${this.user.id}/updatePicture`,
          mutation: "setUser",
          data: formData,
        };
        this.update(options);
        this.wasPosted = true;
        this.imageUploadDisplayed = false;
        this.file = null;
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

    deleteProfilPicture() {
      const contexte = {
        origin: "deleteProfilPicture",
        intention: "confirmation",
        message: "Voulez-vous vraiment supprimer votre photo de profil ?",
        options: {
          url:
            process.env.VUE_APP_LOCALHOST_URL + `users/${this.user.id}/deletePicture`,
          mutation: "setUser",
          id: this.$route.params.id,
        },
      };
      this.$store.commit("displayPopup", contexte);
    },

    offClick(event) {
      if (event.target.closest(".elementToClose") == null) {
        this.optionsDisplayed = false;
        this.imageUploadDisplayed = false;
        this.profilFormDisplayed = false;
        this.passwordFormDisplayed = false;
      }
    },

    onClose(){
      this.optionsDisplayed = false;
    },
  },
};
</script>


<template>
    <div class="userinfos">

      <div class="userinfos__content">
        <BaseAvatar :user="user" origin="profil" />

        <div class="userinfos__meta">
          <h1>
            <span class="userinfos__name">
              {{ user.firstname }} {{ user.lastname }}
            </span> 
            <span v-if="isOwner">
              ({{ user.email }})
            </span>
          </h1>
          <p v-if="user.isAdmin && isOwner">Vous êtes administrateur.</p>
          <p v-if="user.bio">" {{ user.bio }} "</p>
          <p v-else>Aucun biographie n'a été renseignée !</p>
        </div>
      </div>

      <div>
        <!-- Formulaire popup pour modifier sa photo de profil -->

        <!-- <div v-if="imageUploadDisplayed" class="popupform"> -->
          <div
            v-if="imageUploadDisplayed"
            class="popupform"
            @click="offClick"
          >

          <form @submit.prevent="addPicture" class="form popupform__form elementToClose">
            <BaseButton @click="displayImageUpload" tag="button" isCloseBtn>
              <font-awesome-icon icon="times" />
            </BaseButton>

            <h2 class="form__title">Modifiez votre photo de profil :</h2>

            <FormImageUpload @send-imagefile="setFile" :wasPosted="wasPosted" inputfile="profilPictureUpdate" />

            <BaseButton tag="button" nativeType="submit" isGenericBtn>
              Enregistrer
            </BaseButton>

            <BaseButton @click="displayImageUpload" tag="button" isCancelBtn>
              Annuler
            </BaseButton>
          </form>
        </div>

        <!-- Formulaire popup pour modifier son profil -->
        <!-- <div v-if="isOwner" v-show="profilFormDisplayed" class="popupform"> -->
        <div v-if="isOwner" v-show="profilFormDisplayed" class="popupform" @click="offClick">
          <FormProfilUpdate v-if="isOwner" @display-form="displayProfilForm()" class="popup-form__form elementToClose"/>
        </div>

        <!-- Formulaire popup pour modifier son mot de passe -->
        <!-- <div v-if="isOwner" v-show="passwordFormDisplayed" class="popupform"> -->
        <div v-if="isOwner" v-show="passwordFormDisplayed" class="popupform" @click="offClick">
          <FormPasswordUpdate
            v-if="isOwner"
            @display-form="displayPasswordFrom()"
            class="popup-form__form elementToClose"
          />
        </div>
      </div>

      <div class="options" v-if="isOwner || isAdmin">
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
          class="options__dropdown"
          v-outside-click="{ exclude: [classname], handler: onClose }"
        >

          <!-- Modifier sa photo de profil -->
          <BaseButton
            v-if="isOwner && user.imageUrl"
            @click="displayImageUpload(), displayOptions()"
            tag="button"
            isOptionBtn
          >
            <font-awesome-icon icon="camera" />
            Modifier la photo de profil
          </BaseButton>

          <!-- Ajouter une photo de profil -->
          <BaseButton
            v-else-if="isOwner"
            @click="displayImageUpload(), displayOptions()"
            tag="button"
            isOptionBtn
          >
            <font-awesome-icon icon="camera" />
            Ajouter une photo de profil
          </BaseButton>

          <!-- Supprimer sa photo de profil -->
          <BaseButton
            v-if="isOwner && user.imageUrl"
            @click="deleteProfilPicture(), displayOptions()"
            tag="button"
            isOptionBtn
          >
            <font-awesome-icon icon="trash-alt" />
            Supprimer ma photo de profil
          </BaseButton>

          <!-- Modifier son profil -->
          <BaseButton
            v-if="isOwner"
            @click="displayProfilForm(), displayOptions()"
            tag="button"
            isOptionBtn
          >
            <font-awesome-icon icon="pencil-alt" />
            Modifier mon profil
          </BaseButton>

          <!-- Modifier son mot de passe -->
          <BaseButton
            v-if="isOwner"
            @click="displayPasswordFrom(), displayOptions()"
            tag="button"
            isOptionBtn
          >
            <font-awesome-icon icon="lock" />
            Modifier mon mot de passe
          </BaseButton>

          <!-- Supprimer son porfil -->
          <BaseButton
            v-if="isOwner || isAdmin"
            @click="deleteProfil(), displayOptions()"
            tag="button"
            isOptionBtn
          >
            <font-awesome-icon icon="trash-alt" />
            Supprimer le profil
          </BaseButton>
        </div>
      </div>
    </div>
</template>


<style scope lang="scss">
.userinfos {
  @include flexbox(space-between, row, flex-start);
  position: relative;
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

    span {
      font-weight: 400;
    }
    
    @media screen and (max-width: $break-tablet) {
      text-align: center;
    }
  }

  &__name {
    font-size: 3rem;
  }
}
</style>