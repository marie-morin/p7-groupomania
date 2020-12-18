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
    <font-awesome-icon v-if="popup.intention == 'notification'" icon="check-circle" class="popup__icon popup__icon--success"/>
    <font-awesome-icon v-else icon="question-circle" class="popup__icon popup__icon--warning"/>

    <font-awesome-icon icon="times" @click="hidePopup" class="popup__icon popup__icon--close"/>

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
  width: 300px;
  position: fixed;
  left: 20px;
  bottom: 20px;
  background-color: $clear-color;
  border-radius: $small-radius;
  box-shadow: $shadow;
  color: $police-color;
  padding: 10px;

  &__icon {
    font-size: 2rem;
    display: block;
    margin: 10px auto;

    &--success {
      color: $success-color;
    }

    &--warning {
      color: $warning-color;
    }

    &--close {
      position: absolute;
      right: 0;
      top: 0;
      margin: 0;
      padding: 0;
      font-size: 1.3rem;
      margin: 5px;
      cursor: pointer;

      &:hover {
        color: darken($color: $police-color, $amount: 10)
      }
    }
  }

  &__button {
    padding: 5px 15px;
    margin: 5px;
    color: $clear-color;
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    border: none;
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
