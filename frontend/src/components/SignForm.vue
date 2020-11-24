<template>
  <div class="form-section">
    <div class="form-container">
      
      <h1 v-if="settings.destination === 'login'">Inscrivez-vous !</h1>
      <h1 v-else>Connectez-vous !</h1>

      <form @submit.prevent="checkForm" class="form">

        <div>
          <label for="email">Adresse email</label> 
          <input v-model="user.email" type="email" name="email" id="email" required>
        </div>

        <div v-if="settings.destination === 'login'">
          <label for="firstname">Prénom</label> 
          <input v-model="user.firstname" type="text" name="firstname" id="firstname" required>
        </div>

        <div v-if="settings.destination === 'login'">
          <label for="lastname">Nom</label> 
          <input v-model="user.lastname" type="text" name="lastname" id="lastname" required>
        </div>

        <div>
          <label for="password">Mot de passe</label> 
          <input v-model="user.password" type="password" name="password" id="password" required>
        </div>

        <div v-if="settings.destination === 'login'">
          <label for="passwordConf">Confirmation mot de passe</label> 
          <input v-model="user.passwordConf" type="password" name="passwordConf" id="passwordConf" required>
        </div>

        <div v-if="settings.destination === 'login'">
          <label for="bio">Biographie</label>
          <textarea v-model="user.bio" name="bio" id="bio" cols="10" rows="10"></textarea>
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

export default {
  name: "SignForm",

  props: {
    settings: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
    },
  },

  computed: mapGetters(["currentUser"]),

  methods: {
    ...mapActions(["registerUser"]),

    checkForm: function() {
      let data = {
        user : this.user,
        url: this.settings.urlPost,
      }
      this.registerUser(data);
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
