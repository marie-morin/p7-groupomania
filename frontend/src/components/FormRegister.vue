<script>
import { mapGetters, mapActions } from "vuex";
import formValidation from "../mixins/formValidation";
import BaseButton from "@/components/BaseButton";

export default {
  name: "FormRegister",

  components: { BaseButton },

  mixins: [formValidation],

  props: {
    user: {
      type: Object,
    },
    settings: {
      type: Object,
      required: true,
    },
  },

  data() {
    return { passwordConfirmed: false };
  },

  computed: mapGetters(["currentUser"]),

  methods: {
    ...mapActions(["registerUser"]),

    submitUser() {
      if (this.settings.destination == "signup") {
        this.passwordConfirmed = true;
        if (this.user.email == "" || this.user.password == "") {
          const contexte = {
            intention: "alert",
            message:
              "Vous devez renseigner une adresse mail et un mot de passe !",
          };
          this.$store.commit("displayPopup", contexte);
          return;
        }
      } else {
        if (
          this.user.email == "" ||
          this.user.password == "" ||
          this.user.firstname == "" ||
          this.user.lastname == "" ||
          this.user.password == "" ||
          this.user.passwordConf == ""
        ) {
          const contexte = {
            intention: "alert",
            message:
              "Vous devez renseigner une adresse email, un nom, un prénom et un mot de passe !",
          };
          this.$store.commit("displayPopup", contexte);
          return;
        }

        if (
          !this.passwordValidation(this.user.passwordConf) ||
          !this.contentValidation(this.user.firstname) ||
          !this.contentValidation(this.user.lastname)
        ) { return }

        if ( !this.passwordConfirmation(this.user.password, this.user.passwordConf)) {
          this.passwordConfirmed == false;
          return;
        }

        if (this.user.bio != "") {
          if (!this.contentValidation(this.user.bio)) {
            return;
          }
        }
      }

      if (
        !this.emailValidation(this.user.email) ||
        !this.passwordValidation(this.user.password)
      ) { return }
      
      if (this.passwordConfirmed) {
        const data = { user: this.user, url: this.settings.urlPost };
        this.registerUser(data);
      }
    },
  },
};
</script>


<template>
  <form @submit.prevent="submitUser" class="form">
    <h1 v-if="settings.destination === 'login'" class="form__title">Inscrivez-vous au reseau interne de Groupomania !</h1>
    <h1 v-else class="form__title">Connectez-vous à votre compte Groupomania !</h1>

    <!-- Adresse email -->
    <div class="form__group">
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Mon adresse email..."
        required
        v-model="user.email"
        class="form__field"
      />
      <label for="email" class="form__label">Adresse email</label>
    </div>

    <!-- Prénom -->
    <div v-if="settings.destination === 'login'" class="form__group">
      <input
        type="text"
        id="firstname"
        name="firstname"
        placeholder="Mon prénom..."
        required
        v-model="user.firstname"
        class="form__field"
      />
      <label for="firstname" class="form__label">Prénom</label>
    </div>

    <!-- Nom -->
    <div v-if="settings.destination === 'login'" class="form__group">
      <input
        type="text"
        id="lastname"
        name="lastname"
        placeholder="Mon nom..."
        required
        v-model="user.lastname"
        class="form__field"
      />
      <label for="lastname" class="form__label">Nom</label>
    </div>

    <!-- Mot de passe -->
    <div class="form__group">
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Mon mot de passe..."
        required
        v-model="user.password"
        class="form__field"
      />
      <label for="password" class="form__label">Mot de passe</label>
    </div>

    <!-- Confirmation de mot de passe -->
    <div v-if="settings.destination === 'login'" class="form__group">
      <input
        type="password"
        id="passwordConf"
        name="passwordConf"
        placeholder="La confirmation de mon mot de passe..."
        required
        v-model="user.passwordConf"
        class="form__field"
      />
      <label for="passwordConf" class="form__label">Confirmation mot de passe</label>
    </div>

    <!-- Biographie -->
    <div v-if="settings.destination === 'login'" class="form__group">
      <textarea
        id="bio"
        name="bio"
        placeholder="Ma biographie..."
        v-model="user.bio"
        class="form__field"
      ></textarea>
      <label for="bio" class="form__label">Biographie (optionnel)</label>
    </div>    

    <BaseButton tag="button" nativeType="sumbit" isBigGreenBtn>
      {{ settings.title }}
    </BaseButton>

    <!-- Rédirection vers login ou signup -->
    <p>
      {{ settings.question }} ?
      <BaseButton :to="'/' + settings.destination" tag="router-link" isLink>
        {{ settings.option }}
      </BaseButton> !
    </p>
  </form>
</template>


<style scoped lang="scss"></style>