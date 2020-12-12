<script>
import { mapActions, mapGetters } from "vuex";
import BaseButton from "@/components/BaseButton";

export default {
  name: "FormProfilUpdate",

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
          intention: "notification",
          message:
            "Vous devez renseigner une adresse mail, un nom et un prénom !",
        };
        this.$store.commit("displayPopup", contexte);
        return;
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
  <div class="form-section">
    <div class="form-container">
      <form @submit.prevent="updateUser" class="form">
        <label for="email">Adresse email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          v-model="user.email"
        />

        <label for="firstname">Prénom</label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          required
          v-model="user.firstname"
        />

        <label for="lastname">Nom</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          required
          v-model="user.lastname"
        />

        <label for="bio">Biographie</label>
        <textarea id="bio" name="bio" cols="10" rows="10" v-model="user.bio">
        </textarea>

        <div class="form-btn">
          <BaseButton>Enregistrer</BaseButton>
        </div>

        <div class="form-btn">
          <input
            type="submit"
            value="Annuler"
            @click.prevent.stop="$emit('display-form')"
            class="form-submit"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
