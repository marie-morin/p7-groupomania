<script>
import { mapActions, mapGetters } from "vuex";
import formValidation from "../mixins/formValidation";
import BaseButton from "@/components/BaseButton";

export default {
  name: "FormProfilUpdate",

  mixins: [formValidation],

  components: { BaseButton },

  computed: {
    ...mapGetters(["currentUser"]),

    user() {
      return { ...this.currentUser };
    },
  },

  methods: {
    ...mapActions(["update"]),

    updateUser() {
      if (
        this.user.email == "" ||
        this.user.firstname == "" ||
        this.user.lastname == ""
      ) {
        const contexte = {
          intention: "alert",
          message:
            "Vous devez renseigner une adresse mail, un nom et un prénom !",
        };
        this.$store.commit("displayPopup", contexte);
        return;
      }

      if (
        !this.emailValidation(this.user.email) ||
        !this.contentValidation(this.user.firstname) ||
        !this.contentValidation(this.user.lastname)
      ) {
        return;
      }

      if (this.user.bio != "") {
        if (!this.contentValidation(this.user.bio)) {
          return;
        }
      }

      const contexte = {
        origin: "updateUser",
        intention: "confirmation",
        message: "Voulez-vous vraiment modifier votre profil ?",
        options: {
          url: process.env.VUE_APP_LOCALHOST_URL + `users/${this.user.id}`,
          mutation: "setUser",
          data: this.user,
        },
      };
      this.$store.commit("displayPopup", contexte);
      this.$emit("display-form");
    },
  },
};
</script>


<template>
  <form @submit.prevent="updateUser" class="form">
    <!-- Croix pour fermer le formulaire -->
    <BaseButton @click.prevent.stop="$emit('display-form')" tag="button" isCloseBtn>
      <font-awesome-icon icon="times" />
    </BaseButton>

    <h2 class="form__title">Modifiez votre profil :</h2>

    <!-- Adresse email -->
    <div class="form__group">
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Mon adresse email..."
        
        v-model="user.email"
        class="form__field"
      />
      <label for="email" class="form__label">Adresse email</label>
    </div>

    <!-- Prénom -->
    <div class="form__group">
      <input
        type="text"
        id="firstname"
        name="firstname"
        placeholder="Mon prenom..."
        
        v-model="user.firstname"
        class="form__field"
      />
      <label for="firstname" class="form__label">Prénom</label>
    </div>

    <!-- Nom -->
    <div class="form__group field">
      <input
        type="text"
        id="lastname"
        name="lastname"
        placeholder="Mon nom..."
        
        v-model="user.lastname"
        class="form__field"
      />
      <label for="lastname" class="form__label">Nom</label>
    </div>

    <!-- Biographie -->
    <div class="form__group">
      <textarea
        id="bio"
        name="bio"
        placeholder="Ma biographie..."
        v-model="user.bio"
        class="form__field"
      ></textarea>
      <label for="bio" class="form__label">Biographie (optionnel)</label>
    </div>

    <BaseButton tag="button" nativeType="submit" isGenericBtn>
      Enregistrer
    </BaseButton>
    <BaseButton @click.prevent.stop="$emit('display-form')" tag="button" isCancelBtn >
      Annuler
    </BaseButton>
  </form>
</template>


<style scoped lang="scss"></style>