<script>
import { mapActions, mapGetters } from "vuex";
import BaseButton from "@/components/BaseButton";

export default {
  name: "FormProfilUpdate",

  components: { BaseButton },

  data() {
    return {
      updatedPassword: {
        initialMdp: "",
        newMdp: "",
        newMdpConf: "",
        id: this.$route.params.id,
      },
    };
  },

  computed: {
    ...mapGetters(["currentUser"]),

    user() {
      return { ...this.currentUser };
    },
  },

  methods: {
    ...mapActions(["update"]),

    updatePassword() {
      if (
        this.updatedPassword == "" ||
        this.updatedPassword.initialMdp == "" ||
        this.updatedPassword.newMdp == "" ||
        this.updatedPassword.newMdpConf == ""
      ) {
        const contexte = {
          intention: "notification",
          message:
            "Vous devez renseigner votre mot de passe actuel, votre nouveau mot de passe, et la confirmation de votre nouveau mot de passe !",
        };
        this.$store.commit("displayPopup", contexte);
        return;
      }

      if (this.updatedPassword.newMdp !== this.updatedPassword.newMdpConf) {
        const contexte = {
          intention: "notification",
          message:
            "La confirmation du mot de passe doit être identique au nouveau mot de passe !",
        };
        this.$store.commit("displayPopup", contexte);
        return;
      }

      const contexte = {
        origin: "updatePassword",
        intention: "confirmation",
        message: "Voulez-vous vraiment modifier votre mot de passe ?",
        options: {
          url:
            process.env.VUE_APP_LOCALHOST_URL +
            `users/${this.$route.params.id}/password`,
          mutation: "setUser",
          data: this.updatedPassword,
        },
      };
      this.$store.commit("displayPopup", contexte);
      this.$emit("display-form");
    },
  },
};
</script>

<template>
  <form class="form">
    <font-awesome-icon
      icon="times"
      @click.prevent.stop="$emit('display-form')"
      class="close-cross"
    />

    <h2 class="form__title">Modifiez votre mot de passe :</h2>
    <div class="form__group">
      <input
        type="password"
        id="initialMdp"
        name="initialMdp"
        required
        v-model="updatedPassword.initialMdp"
        class="form__field"
      />
      <label for="initialMdp" class="form__label">Votre mot de passe actuel :</label> <br />
    </div>

    <div class="form__group">
      <input
        type="password"
        id="newMdp"
        name="newMdp"
        required
        v-model="updatedPassword.newMdp"
        class="form__field"
      />
      <label for="newMdp" class="form__label">Votre nouveau mot de passe :</label><br />
    </div>

    <div class="form__group">
      <input
        type="password"
        id="newMdpConf"
        name="newMdpConf"
        required
        v-model="updatedPassword.newMdpConf"
        class="form__field"
      />
      <label for="newMdpConf" class="form__label">Confirmation de votre nouveau mot de passe :</label>
    </div>

    <BaseButton :onClick="updatePassword">Modifier</BaseButton>

    <input
      type="submit"
      value="Annuler"
      @click.prevent.stop="$emit('display-form')"
      class="global-btn"
    />
  </form>
</template>

<style scoped lang="scss"></style>