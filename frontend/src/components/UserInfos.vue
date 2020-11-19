<template>
  <div class="page-content">
    <div class="infos-container">
      <h1>Bienvenue {{ user.firstname }} !</h1>

      <h3>Nom d'utilisateur :</h3>
      <p>{{ user.firstname }} {{ user.lastname }}</p>

      <h3>Email :</h3>
      <p>{{ user.email }}</p>

      <h3>Biographie :</h3>
      <p v-if="user.bio">{{ user.bio }}</p>
      <p v-else>Vous n'avez pas encore ajouté de biographie à votre profil !</p>

      <h3 v-if="user.isAdmin == 1">Administration :</h3>
      <p v-if="user.isAdmin == 1">Vous êtes administrateur.</p>
    </div>
  </div>
</template>

// 

<script>
// import { mapGetters } from "vuex";

export default {
  name: "UserInfos",

  // computed: mapGetters(["currentUser"]),

  props: {
    user: {
      type: Object,
      required: true,
    }
  }


  // <template>
//   <div class="page-content">
//     <div class="infos-container">
//       <h1>Bienvenue {{ currentUser.firstname }} !</h1>

//       <h3>Nom d'utilisateur :</h3>
//       <p>{{ currentUser.firstname }} {{ currentUser.lastname }}</p>

//       <h3>Email :</h3>
//       <p>{{ currentUser.email }}</p>

//       <h3>Biographie :</h3>
//       <p v-if="currentUser.bio">{{ currentUser.bio }}</p>
//       <p v-else>Vous n'avez pas encore ajouté de biographie à votre profil !</p>

//       <h3 v-if="currentUser.isAdmin == 1">Administration :</h3>
//       <p v-if="currentUser.isAdmin == 1">Vous êtes administrateur.</p>
//     </div>
//   </div>
// </template>

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

