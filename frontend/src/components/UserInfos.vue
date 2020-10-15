<template>
  <div class="page-content">
    <div class="infos-container">
      <!-- <h1>Bienvenue {{ user.username.split(" ")[0] }} !</h1> -->
      <!-- <h1>Bienvenue {{ user.username.split(" ")[0] }} !</h1> -->
      <h3>Nom d'utilisateur :</h3>
      <p>{{ user.username }}</p>
      <h3>Email :</h3>
      <p>{{ user.email }}</p>
      <h3>Biographie :</h3>
      <p>{{ user.bio }}</p>
      <button v-on:click="$emit('display-form')">
        Modifier mon profil
      </button>
      <!-- <button @click.prevent="modifyProfil" v-on:click="$emit('show-form')">
        Modifier mon profil
      </button> -->
      <button @click.prevent="deleteProfil">Supprimer mon profil</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
let TOKEN = localStorage.getItem("jwt");
const headers = {
  Authorization: "Bearer " + TOKEN.replace(/['"']+/g, ""),
};

export default {
  name: "UserInfos",

  props: {
    user: {
      type: Object,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },

  data: function() {
    return {
      showForm: false,
    };
  },

  methods: {
    deleteProfil: function() {
      if (window.confirm("Voulez-vous vraiment supprimer votre compte ?")) {
        axios.delete("http://localhost:3000/api/users/" + this.userId, {
          headers: headers,
        });

        localStorage.clear();
        this.$router.push("Home");
      }
    },
    modifyProfil: function() {
      console.log(this.userId);
      this.showForm = true;
      return this.showForm;
    },
  },
};
</script>

<style scope lang="scss">
h1 {
  margin: 0;
  color: $groupomania-red;
  text-align: center;
  margin-bottom: 20px;
}
h3 {
  margin: 0;
  color: $groupomania-font-blue;
}
p {
  margin-top: 5px;
}
.infos {
  width: 100%;
  margin: 0 auto;
  background-color: $groupomania-back-grey;

  &-container {
    width: 40%;
    margin: 0 auto;
    padding: 30px;
    background-color: $groupomania-back-grey;
    border-radius: $radius;
    border: 2px solid $groupomania-red;
    text-align: left;
    color: $groupomania-font-blue;

    @media screen and(max-width: $large + 100) {
      width: 70%;
    }
    @media screen and(max-width: $small) {
      width: 90%;
      padding: 40px 10px;
    }
  }
}

.option {
  color: $groupomania-red;
  text-transform: none;
}
</style>
