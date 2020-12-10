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
        this.updatedPassword.newMdpConf == "" ||
        this.updatedPassword.id == ""
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
    },
  },
};
</script>

<template>
  <form>
    <label for="initialMdp">Votre mot de passe actuel :</label> <br />
    <input
      type="password"
      id="initialMdp"
      name="initialMdp"
      required
      v-model="updatedPassword.initialMdp"
    />
    <br />

    <label for="newMdp">Votre nouveau mot de passe :</label><br />
    <input
      type="password"
      id="newMdp"
      name="newMdp"
      required
      v-model="updatedPassword.newMdp"
    />
    <br />

    <label for="newMdpConf">Confirmation de votre nouveau mot de passe :</label
    ><br />
    <input
      type="password"
      id="newMdpConf"
      name="newMdpConf"
      required
      v-model="updatedPassword.newMdpConf"
    />
    <br />

    <div class="form-btn">
      <BaseButton :onClick="updatePassword">Modifier</BaseButton>
      <!-- <BaseButton :onClick="displayPasswordFrom">Annuler</BaseButton> -->

      <div class="form-btn">
        <input
          type="submit"
          value="Annuler test"
          @click.prevent.stop="$emit('display-form')"
          class="form-submit"
        />
      </div>
    </div>
  </form>
</template>

<style scoped lang="scss"></style>
