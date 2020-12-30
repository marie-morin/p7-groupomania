<script>
import { mapGetters, mapActions } from "vuex";
import BaseButton from "@/components/BaseButton";

export default {
  name: "ThePopup",

  components: { BaseButton },

  computed: mapGetters(["popup", "currentUser"]),

  mounted() {
    if (this.popup.intention === "alert" || this.popup.intention === "success") {
      setTimeout(() => this.$store.commit("hidePopup"), 5000);
    }
  },

  methods: {
    ...mapActions(["update", "delete"]),

    hidePopup() { this.$store.commit("hidePopup") },

    confirm() {
      const origin = this.popup.origin;

      let notifyContexte = {
        message: "",
        intention: "success",
      };

      switch (origin) {
        case "updateUser":
          this.update(this.popup.options);
          notifyContexte.message = "Le compte à été modifié !";
          break;
        case "updateProfilPicture":
          this.update(this.popup.options);
          notifyContexte.message = "Le compte à été modifié !";
          break;
        case "deleteProfilPicture":
          this.update(this.popup.options);
          notifyContexte.message = "La photo de profil à été supprimée !";
          break;
        case "updatePassword":
          this.update(this.popup.options);
          notifyContexte.message = "Le mot de passe a été modifié !";
          break;
        case "deletePost":
          this.delete(this.popup.options);
          notifyContexte.message = "Votre post à été supprimé !";
          break;
        case "deleteComment":
          this.delete(this.popup.options);
          notifyContexte.message = "Votre commentaire à été supprimé !";
          break;
        case "deleteProfil":
          this.delete(this.popup.options);
          notifyContexte.message = "Le compte à été supprimé !";
          if (this.currentUser.isAdmin) {
            this.$router.push({ name: "Home" });
          } else {
            localStorage.clear();
            this.$router.push({ name: "Landing" });
          }
          break;
        default:
          notifyContexte.message = "Un errer est survenu !";
      }
      this.$store.commit("displayPopup", notifyContexte);
      setTimeout(() => this.$store.commit("hidePopup"), 5000);
    },
  },
};
</script>


<template>
  <div class="popup">
    <!-- Icons de notification de l'information : allter, success ou warning -->
    <font-awesome-icon v-if="popup.intention == 'success'" icon="check-circle" class="popup__icon popup__icon--success"/>
    <font-awesome-icon v-else-if="popup.intention == 'alert'" icon="exclamation-circle" class="popup__icon popup__icon--warning"/>
    <font-awesome-icon v-else icon="question-circle" class="popup__icon popup__icon--warning"/>

    <!-- Croix pour fermer le formulaire -->
    <BaseButton @click="hidePopup" tag="button" isCloseBtn tabindex="1">
      <font-awesome-icon icon="times" />
    </BaseButton>

    <p>{{ popup.message }}</p>

    <BaseButton v-if="popup.intention == 'confirmation'" @click="confirm()" tag="button" isGenericBtn>
      Oui
    </BaseButton>
    <BaseButton v-if="popup.intention == 'confirmation'" @click="hidePopup()" tag="button" isCancelBtn>
      Annuler
    </BaseButton>
  </div>
</template>


<style scope lang="scss">
.popup {
  width: 30rem;
  position: fixed;
  left: 2rem;
  bottom: 2rem;
  padding: $base-padding;

  background-color: $clear-color;
  color: $police-color;

  box-shadow: $shadow;
  border-radius: $small-radius;

  z-index: 3;

  &__icon {
    display: block;
    margin: $marged-centered-margin;

    &--success {
      color: $success-color;
    }

    &--alert {
      color: $warning-color;
    }

    &--warning {
      color: $warning-color;
    }
  }
}
</style>