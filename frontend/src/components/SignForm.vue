<template>
  <div class="form-section">
    <div class="form-container">
      
      <h1 v-if="settings.destination === 'login'">Inscrivez-vous !</h1>
      <h1 v-else>Connectez-vous !</h1>

      <form @submit.prevent="submitUser" class="form">
        <div>
          <label for="email">Adresse email</label> 
          <input v-model="user.email" type="email" name="email" id="email" placeholder="Mon adresse email..." required>
        </div>

        <div v-if="settings.destination === 'login'">
          <label for="firstname">Prénom</label> 
          <input v-model="user.firstname" type="text" name="firstname" id="firstname" placeholder="Mon prénom..." required>
        </div>

        <div v-if="settings.destination === 'login'">
          <label for="lastname">Nom</label> 
          <input v-model="user.lastname" type="text" name="lastname" id="lastname" placeholder="Mon nom..." required>
        </div>

        <div>
          <label for="password">Mot de passe</label> 
          <input v-model="user.password" type="password" name="password" id="password" placeholder="Mon mot de passe..." required>
        </div>

        <div v-if="settings.destination === 'login'">
          <label for="passwordConf">Confirmation mot de passe</label> 
          <input v-model="user.passwordConf" type="password" name="passwordConf" id="passwordConf" placeholder="La confirmation de mon mot de passe..." required>
        </div>

        <div v-if="settings.destination === 'login'">
          <label for="bio">Biographie</label>
          <textarea v-model="user.bio" name="bio" id="bio" cols="10" rows="10"  placeholder="Ma biographie..."></textarea>
        </div>

        <div class="form-btn">
          <input type="submit" class="form-submit" :value="settings.title" />
        </div>
      </form>
    </div>
    <p>
      {{ settings.question }} ?
      <router-link :to="'/' + settings.destination" class="option">{{
        settings.option
      }}</router-link>
      !
    </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%?]{6,}$/;
// const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// const regex = /^[a-zA-Z0-9\s-_.,!?()"]+$/;

export default {
  name: "SignForm",

  props: {
    user: {
      type: Object,
    },
    settings: {
      type: Object,
      required: true,
    }
  },

  data() {
    return {
      passwordConfirmed: false,
    }
  },

  computed: mapGetters(["currentUser"]),

  methods: {
    ...mapActions(["registerUser"]),

    submitUser() {
      if (this.settings.destination == "signup") {
        //login

        this.passwordConfirmed = true;
        if (this.user.email == "" || this.user.password == "") {
          const contexte = {
            intention: "notification",
            message: "Vous devez renseigner une adresse mail et un mot de passe !",
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
            message: "Vous devez renseigner une adresse email, un nom, un prénom et un mot de passe !",
          };
          this.$store.commit("displayPopup", contexte);
          return;
        }

        if (!passwordRegex.test(this.user.password)) {
          const contexte = {
            intention: "notification",
            message: `Le mot de passe doit comporter au moins 8 caractères, une majuscule, une minuscule, une lettre et un chiffre. Seuls les caractères suivant sont autorisée : @ $ ! % ?`,
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
            message: "La confirmation du mot de passe doit être identique au mot de passe !",
          };
          this.$store.commit("displayPopup", contexte);
          return;
        }
      }

      if(this.passwordConfirmed) {
        const data = { user : this.user, url: this.settings.urlPost }
        this.registerUser(data);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.form {
  width: 100%;
  margin: 0 auto;
  background-color: $groupomania-back-grey;
  border-radius: 5px;

  &-container {
    width: 40%;
    margin: 0 auto;
    padding: 40px;
    background-color: $groupomania-back-grey;
    border-radius: $radius;
    border: 3px solid $groupomania-red;

    @media screen and(max-width: $large + 100) {
      width: 70%;
    }
    @media screen and(max-width: $small) {
      width: 90%;
      padding: 40px 10px;
    }
  }

  &-row {
    margin: 10px 0;
    text-align: left;
  }

  &-btn {
    width: 40%;
    margin: 0 auto;
  }
  &-submit {
    display: block;
    border-radius: $radius;
    background-color: $groupomania-red;
    color: $groupomania-police;
    font-weight: bold;
    text-transform: uppercase;

    &:hover {
      background-color: darken($color: $groupomania-red, $amount: 5);
    }
  }

  input {
    width: 100%;
    height: 40px;
    margin: 5px 0;
    padding: 0 5px;
    border: none;
    border-radius: $radius;
  }
  textarea {
    width: 100%;
    margin: 5px 0 20px 0;
    border: none;
    border-radius: $radius;
    min-height: 40px;
  }

  label {
    color: $groupomania-font-blue;
  }
}

.option {
  color: $groupomania-red;
  text-transform: none;
}

h1 {
  margin: 0;
  color: $groupomania-font-blue;
}
</style>
