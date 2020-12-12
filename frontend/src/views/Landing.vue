<script>
import BaseButton from "@/components/BaseButton";

export default {
  name: "Landing",
  components: { BaseButton },
};
</script>

<template>
  <div>
    <h1>Bienvenue sur votre réseau interne Groupomania</h1>
    <BaseButton to="/signup">S'inscrire</BaseButton>
    <BaseButton to="/login">Se connecter</BaseButton>
  </div>
</template>

<style scope lang="scss">
</style>
