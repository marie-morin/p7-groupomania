<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "ThePopup",

  computed: {  ...mapGetters(['popup', 'currentUser']) },

  mounted() {
    if(this.popup.intention === 'notification') {
      setTimeout(() => this.$store.commit('hidePopup'), 7000);
    }
  },

  methods: {
    ...mapActions(['update', 'delete']),

    hidePopup() {
      this.$store.commit('hidePopup');
    },

    confirm() {
      const origin = this.popup.origin;

      let notifyContexte = {
        message: "",
        intention: "notification"
      };

      switch (origin) {
        case 'updateUser':
          this.update(this.popup.options);  
          notifyContexte.message =  "Le compte à été modifié !";
          break;

        case 'updatePassword':
          this.update(this.popup.options);  
          notifyContexte.message =  "Le mot de passe a été modifié !";
          break;

        case 'deletePost':
          this.delete(this.popup.options);
          notifyContexte.message =  "Votre post à été supprimé !";
          break;

        case 'deleteComment':
          this.delete(this.popup.options);
          notifyContexte.message =  "Votre commentaire à été supprimé !";  
          break;

        case 'deleteProfil':
          this.delete(this.popup.options);
          notifyContexte.message =  "Le compte à été supprimé !";

          if (this.currentUser.isAdmin) {
            this.$router.push({ name: 'Home' });
          } else {
            localStorage.clear();
            this.$router.push({ name: 'Landing' });
          }
          break;

        default:
          console.log(`Error`);
      }

      this.$store.commit('displayPopup', notifyContexte);
      setTimeout(() => this.$store.commit('hidePopup'), 7000);
    },
  }
};
</script>


<template>
  <div class="popup">
    <p v-if="popup.intention == 'notification'">
      Notification d'action
    </p>
    <p v-else>
      Nécessité de confirmation
    </p>

    <button @click="hidePopup">
      Fermer
    </button>

    <p>{{ popup.message }}</p>

    <button
      v-if="popup.intention == 'confirmation'"
      @click="confirm()"
    >
      Oui
    </button>

    <button
      v-if="popup.intention == 'confirmation'"
      @click="hidePopup()"
    >
      Annuler
    </button>
  </div>
</template>


<style scope lang="scss">
.popup {
  width: 300px;
  background-color: $groupomania-red;
  position: fixed;
  left: 20px;
  bottom: 20px;
}
</style>
