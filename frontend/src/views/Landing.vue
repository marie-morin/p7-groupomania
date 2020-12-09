<script>
import BaseButton from "@/components/BaseButton";

export default { 
  name: "Landing",
  components: { BaseButton },
};
</script>


<template>
  <div class="landing">
      <div class="bienvenue">
        <h1>Bienvenue sur votre réseau interne Groupomania</h1>
      </div>
      <div class="redirection">
        <BaseButton to="/signup">S'inscrire</BaseButton>
        <BaseButton to="/login">Se connecter</BaseButton>
      </div>
  </div>
</template>


<style scope lang="scss">
// .landing {
//   height: 100vh;
//   @include flexbox(center, column, center);
//   background-image: url("../../public/images/fond.png");
//   background-size: cover;
// }

// .content {
//   @include flexbox(center, column, center);
// }

// .redirection {
//   @media screen and (max-width: 400px) {
//     @include flexbox(center, column, center);
//   }
// }

// .btn {
//   @media screen and (max-width: $x-small) {
//     margin-top: 20px;
//   }
// }
</style>
