<script>
import { mapGetters, mapActions } from "vuex";
import BaseButton from "@/components/BaseButton";
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%?]{6,}$/;
// // const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// // const regex = /^[a-zA-Z0-9\s-_.,!?()"]+$/;

export default {
  name: "FormRegister",

  components: { BaseButton },

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
    return {
      passwordConfirmed: false,
    };
  },

  computed: {
    ...mapGetters(["currentUser"]),
  },

  methods: {
    ...mapActions(["registerUser"]),

    submitUser() {
      if (this.settings.destination == "signup") {
        //login

        this.passwordConfirmed = true;
        if (this.user.email == "" || this.user.password == "") {
          const contexte = {
            intention: "notification",
            message:
              "Vous devez renseigner une adresse mail et un mot de passe !",
          };
          this.$store.commit("displayPopup", contexte);
          return;
        }
      } else {
        //signup

        if (
          this.user.email == "" ||
          this.user.password == "" ||
          this.user.firstname == "" ||
          this.user.lastname == "" ||
          this.user.password == "" ||
          this.user.passwordConf == ""
        ) {
          const contexte = {
            intention: "notification",
            message:
              "Vous devez renseigner une adresse email, un nom, un prénom et un mot de passe !",
          };
          this.$store.commit("displayPopup", contexte);
          return;
        }

        if (!passwordRegex.test(this.user.password)) {
          const contexte = {
            intention: "notification",
            message: `Le mot de passe doit comporter au moins 8 caractères, une majuscule, une minuscule, une lettre et un chiffre. Seuls les caractères spéciaux suivants sont autorisée : @ $ ! % ?`,
          };
          this.$store.commit("displayPopup", contexte);
          return;
        }

        if (this.user.password === this.user.passwordConf) {
          this.passwordConfirmed = true;
        } else {
          this.passwordConfirmed = false;
          const contexte = {
            intention: "notification",
            message:
              "La confirmation du mot de passe doit être identique au mot de passe !",
          };
          this.$store.commit("displayPopup", contexte);
          return;
        }
      }

      if (this.passwordConfirmed) {
        const data = { user: this.user, url: this.settings.urlPost };
        this.registerUser(data);
      }
    },
  },
};
</script>

<template>
  <form @submit.prevent="submitUser">

    <h1 v-if="settings.destination === 'login'">Inscrivez-vous !</h1>
    <h1 v-else>Connectez-vous !</h1>

    <!-- Adresse email -->
    <div>
      <label for="email">Adresse email</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Mon adresse email..."
        required
        v-model="user.email"
      />
    </div>

    <!-- Prénom -->
    <div v-if="settings.destination === 'login'">
      <label for="firstname">Prénom</label>
      <input
        type="text"
        id="firstname"
        name="firstname"
        placeholder="Mon prénom..."
        required
        v-model="user.firstname"
      />
    </div>

    <!-- Nom -->
    <div v-if="settings.destination === 'login'">
      <label for="lastname">Nom</label>
      <input
        type="text"
        id="lastname"
        name="lastname"
        placeholder="Mon nom..."
        required
        v-model="user.lastname"
      />
    </div>

    <!-- Mot de passe -->
    <div>
      <label for="password">Mot de passe</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Mon mot de passe..."
        required
        v-model="user.password"
      />
    </div>

    <!-- Confirmation de mot de passe -->
    <div v-if="settings.destination === 'login'">
      <label for="passwordConf">Confirmation mot de passe</label>
      <input
        type="password"
        id="passwordConf"
        name="passwordConf"
        placeholder="La confirmation de mon mot de passe..."
        required
        v-model="user.passwordConf"
      />
    </div>

    <!-- Biographie -->
    <div v-if="settings.destination === 'login'">
      <label for="bio">Biographie</label>
      <textarea
        id="bio"
        name="bio"
        placeholder="Ma biographie..."
        cols="10"
        rows="10"
        v-model="user.bio"
      ></textarea>
    </div>    

    <BaseButton>{{ settings.title }}</BaseButton>

    <p>
      {{ settings.question }} ?
      <router-link :to="'/' + settings.destination"
        >{{ settings.option }}
      </router-link>
      !
    </p>
  </form>
</template>


<style scoped lang="scss">
</style>
