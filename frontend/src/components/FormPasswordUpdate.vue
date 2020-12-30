<script>
import { mapActions, mapGetters } from "vuex";
import formValidation from "../mixins/formValidation";
import BaseButton from "@/components/BaseButton";

export default {
  name: "FormProfilUpdate",

  components: { BaseButton },

  mixins: [formValidation],

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
        this.updatedPassword.initialMdp == "" ||
        this.updatedPassword.newMdp == "" ||
        this.updatedPassword.newMdpConf == ""
      ) {
        const contexte = {
          intention: "alert",
          message:
            "Vous devez renseigner votre mot de passe actuel, votre nouveau mot de passe, et la confirmation de votre nouveau mot de passe !",
        };
        this.$store.commit("displayPopup", contexte);
        return;
      }

      if (
        !this.passwordValidation(this.updatedPassword.initialMdp) ||
        !this.passwordValidation(this.updatedPassword.newMdp) ||
        !this.passwordConfirmation(this.updatedPassword.newMdp, this.updatedPassword.newMdpConf)
      ) {
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
  <form @submit.prevent="updatePassword" class="form">

    <!-- Croix pour fermer le formulaire -->
    <BaseButton @click.prevent.stop="$emit('display-form')" tag="button" isCloseBtn>
      <font-awesome-icon icon="times" />
    </BaseButton>

    <h2 class="form__title">Modifiez votre mot de passe :</h2>

    <!-- Ancien mot de passe -->
    <div class="form__group">
      <input
        type="password"
        id="initialMdp"
        name="initialMdp"
        placeholder="Mon mot de passe actuel..."
        required
        v-model="updatedPassword.initialMdp"
        class="form__field"
      />
      <label for="initialMdp" class="form__label">Votre mot de passe actuel :</label> <br />
    </div>

    <!-- Nouveau mot de passe -->
    <div class="form__group">
      <input
        type="password"
        id="newMdp"
        name="newMdp"
        placeholder="Mon nouveau mot de passe..."
        required
        v-model="updatedPassword.newMdp"
        class="form__field"
      />
      <label for="newMdp" class="form__label">Votre nouveau mot de passe :</label><br />
    </div>

    <!-- Confirmation du nouveau mot de passe -->
    <div class="form__group">
      <input
        type="password"
        id="newMdpConf"
        name="newMdpConf"
        placeholder="Confirmation de mon nouveau mot de passe..."
        required
        v-model="updatedPassword.newMdpConf"
        class="form__field"
      />
      <label for="newMdpConf" class="form__label">Confirmation de votre nouveau mot de passe :</label>
    </div>

    <BaseButton tag="button" nativeType="submit" isGenericBtn>
      Modifier le mot de passe
    </BaseButton>
    <BaseButton @click.prevent.stop="$emit('display-form')" tag="button" isCancelBtn>
      Annuler
    </BaseButton>
  </form>
</template>


<style scoped lang="scss"></style>