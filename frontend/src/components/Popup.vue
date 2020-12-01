<template>
    <div class="popup">
        <p v-if="popup.intention == 'notification'">Notification d'action</p>
        <p v-else>Nécessité de confirmation</p>
        <button @click="hidePopup">Fermer</button>
        <p>{{ popup.message }}</p>
        <button @click="confirm()" v-if="popup.intention == 'confirmation'">Oui</button>
        <button @click="hidePopup()" v-if="popup.intention == 'confirmation'">Annuler</button>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "Popup",

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

      if (origin == "updateUser") {
        this.update(this.popup.options);  
        notifyContexte.message =  "Le compte à été modifié !";
      }
      if (origin == "updatePassword") {
        this.update(this.popup.options);  
        notifyContexte.message =  "Le mot de passe a été modifié !";
      }
      if (origin == "deletePost") {
        this.delete(this.popup.options);
        notifyContexte.message =  "Votre post à été supprimé !"; 
      }
      if (origin == "deleteComment") {
        this.delete(this.popup.options);
        notifyContexte.message =  "Votre commentaire à été supprimé !"; 
      }
      if (origin == "deleteProfil") {
        this.delete(this.popup.options);
        notifyContexte.message =  "Le compte à été supprimé !";
        if (this.currentUser.isAdmin) {
          this.$router.push({ name: 'Home' });
       } else {
         localStorage.clear();
         this.$router.push({ name: 'Landing' });
       }
      }

      this.$store.commit('displayPopup', notifyContexte);

      setTimeout(() => this.$store.commit('hidePopup'), 7000);
    },
  }
};
</script>

<style scope lang="scss">
.popup {
  width: 300px;
  background-color: $groupomania-red;
  position: fixed;
  left: 20px;
  bottom: 20px;
}
</style>
