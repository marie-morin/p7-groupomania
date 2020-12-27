<script>
import BaseButton from "@/components/BaseButton";

export default {
  name: "NotFound",

  components: { BaseButton },
};
</script>


<template>
  <div class="notfound container">
    <h1>404</h1>
    <p>
        Il semblerait que vous essayez d'acceder à une page qui a été supprimée ou qui n'a jamais existé !
    </p>
    <BaseButton tag="router-link" to="/home" isLink>
        Retour à l'accueil
    </BaseButton>
  </div>
</template>


<style scope lang="scss"></style>