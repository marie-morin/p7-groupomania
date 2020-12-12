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
</style>
