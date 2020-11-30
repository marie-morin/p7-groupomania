<template>
    <div class="popup">
        <p v-if="popup.intention == 'notification'">Notification d'action</p>
        <p v-else>Nécessité de confirmation</p>
        <button @click="hidePopup">Fermer</button>
        <p>Message : {{ popup.message }}</p>
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
    ...mapActions(['delete']),

    hidePopup() {
      this.$store.commit('hidePopup');
    },

    confirm() {
      // this.delete(this.popup.options);

      const origin = this.popup.origin;
      let notifyContexte = {
        message: "",
        intention: "notification"
      };

      if(origin == 'post') {
        notifyContexte.message =  "Votre post à été supprimé !"; 
      } else if (origin == 'comment') {
        notifyContexte.message =  "Votre commentaire à été supprimé !"; 
      } else if (origin == 'profil') {
        notifyContexte.message =  "Le compte à été supprimé !"; 
      }
      this.$store.commit('displayPopup', notifyContexte);

      // console.log(this.currentUser);

      // if (origin == "profil") {
      //   if (this.currentUser.isAdmin) {
      //     console.log("pass");
      //     this.$router.replace({ path: 'Home' });
      //  } else {
      //    localStorage.clear();
      //    this.$router.replace("Landing");
      //  }
      // }
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
