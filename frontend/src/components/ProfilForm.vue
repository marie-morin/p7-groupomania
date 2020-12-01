<template>
  <div class="form-section">
    <div class="form-container">
      <form @submit.prevent="updateUser" class="form">
        <label for="email">Adresse email</label> 
        <input v-model="user.email" type="email" name="email" id="email" required>

        <label for="firstname">Prénom</label> 
        <input v-model="user.firstname" type="text" name="firstname" id="firstname" required>

        <label for="lastname">Nom</label> 
        <input v-model="user.lastname" type="text" name="lastname" id="lastname" required>

        <label for="bio">Biographie</label>
        <textarea v-model="user.bio" name="bio" id="bio" cols="10" rows="10"></textarea>

        <div class="form-btn">
          <input type="submit" class="form-submit" value="Enregistrer" />
        </div>

        <div class="form-btn">
          <input
            type="submit"
            class="form-submit"
            value="Annuler"
            @click.prevent.stop="$emit('display-form')"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "ProfilForm",

  computed: { 
    ...mapGetters(['currentUser']),

    user() { return {...this.currentUser}; }
  },

  methods: {
    ...mapActions(['update']),

    updateUser() {
      if (this.user.email == "" || this.user.firstname == "" || this.user.lastname == "") {
        const contexte = {
          intention: "notification",
          message: "Vous devez renseigner une adresse mail, un nom et un prénom !",
        };
        this.$store.commit("displayPopup", contexte);
        return;
      }

      const contexte = {
        origin: "updateUser",
        intention: "confirmation",
        message: "Voulez-vous vraiment modifier votre compte ?",
        options: {
          url: `http://localhost:3000/api/users/${this.user.id}`,
          mutation: "setUser",
          data: this.user,
        },
      };
      this.$store.commit("displayPopup", contexte);
    },
  }
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
