<template>
  <div class="profil">
    <div class="top-content">
      <Header />

      <div class="content">
        <UserInfos
          :user="user"
          :userId="userId"
          v-on:display-form="displayFrom()"
        />
        <button @click="displayFrom()">Modifier mon profil</button>
        <button @click.prevent="deleteProfil">Supprimer mon profil</button>
        <ProfilForm
          v-show="showForm === true"
          :settings="settings"
          :schema="schema"
          :user="user"
          :userId="userId"
          v-on:display-form="displayFrom()"
        />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import UserInfos from "@/components/UserInfos.vue";
import ProfilForm from "@/components/ProfilForm.vue";

import axios from "axios";
let id = localStorage.getItem("user");

let TOKEN = localStorage.getItem("jwt");
const headers = {
  Authorization: "Bearer " + TOKEN.replace(/['"']+/g, ""),
};

export default {
  name: "Profil",

  components: {
    Header,
    Footer,
    UserInfos,
    ProfilForm,
  },

  data: function() {
    return {
      user: {},
      userId: id,
      showForm: false,
      settings: {
        userId: id,
        title: "Enregistrer",
        urlPost: "http://localhost:3000/api/users/",
      },
      schema: {
        email: { elt: "input", type: "text", label: "Email", value: "test" },
        firstname: {
          elt: "input",
          type: "text",
          label: "Prénom",
          value: "test",
        },
        lastname: { elt: "input", type: "text", label: "Nom", value: "test" },
        password: {
          elt: "input",
          type: "password",
          label: "Mot de passe",
          value: "test",
        },
        bio: { elt: "textarea", label: "Biographie", value: "test" },
      },
    };
  },

  created: function() {
    this.displayUser();
  },

  methods: {

    displayUser: function() {
      axios
        .get("http://localhost:3000/api/users/" + id)
        .then((response) => {
          this.user = response.data;
          console.log(this.user);
        })
        .catch((error) => console.log(error));
    },

    displayFrom: function() {
      this.showForm = !this.showForm;
      return this.showForm;
    },

    deleteProfil: function() {
      console.log(this.userId);
      console.log(this.user);
      if (window.confirm("Voulez-vous vraiment supprimer votre compte ?")) {
        axios.delete("http://localhost:3000/api/users/" + id,
        { body: this.user },
        { headers: headers },
      );

        // localStorage.clear();
        // this.$router.push("Home");
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
.profil {
  min-height: 100vh;
  @include flexbox(space-between, column, center);
}
.top-content {
  width: 100vw;
  height: 100%;
}
.content {
  width: 100vw;
  min-height: 80vh;
  background-image: url("../../public/images/fond.png");
  background-size: cover;
  padding: 70px 0;
}
h2 {
  color: $groupomania-red;
}
</style>
