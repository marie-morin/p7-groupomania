<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ThePopup",

  computed: { ...mapGetters(["popup", "currentUser"]) },

  mounted() {
    if (this.popup.intention === "notification") {
      setTimeout(() => this.$store.commit("hidePopup"), 6000);
    }
  },

  methods: {
    ...mapActions(["update", "delete"]),

    hidePopup() {
      this.$store.commit("hidePopup");
    },

    confirm() {
      const origin = this.popup.origin;

      let notifyContexte = {
        message: "",
        intention: "notification",
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
          console.log(`Error`);
      }

      this.$store.commit("displayPopup", notifyContexte);
      setTimeout(() => this.$store.commit("hidePopup"), 7000);
    },
  },
};
</script>

<template>
  <div class="popup">
    <font-awesome-icon v-if="popup.intention == 'success'" icon="check-circle" class="popup__icon popup__icon--success"/>
    <font-awesome-icon v-else-if="popup.intention == 'alert'" icon="exclamation-circle" class="popup__icon popup__icon--warning"/>
    <font-awesome-icon v-else icon="question-circle" class="popup__icon popup__icon--warning"/>

    <font-awesome-icon icon="times" @click="hidePopup" class="popup__icon close-cross"/>

    <p>{{ popup.message }}</p>

    <button v-if="popup.intention == 'confirmation'" @click="confirm()" class="popup__button popup__button--confirm">
      Oui
    </button>

    <button v-if="popup.intention == 'confirmation'" @click="hidePopup()" class="popup__button popup__button--deny">
      Annuler
    </button>
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

  &__button {
    padding: $base-padding;
    margin: 0.5rem;

    color: $clear-color;
    border: none;

    font-family: inherit;
    font-weight: inherit;
    cursor: pointer;

    &--confirm {
      color: $success-color;
    }

    &--deny {
      color: $warning-color;
    }

    &:hover {
      background-color: darken($color: $police-color, $amount: 1);
    }
  }
}
</style>