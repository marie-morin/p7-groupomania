<script>
import BaseButton from "@/components/BaseButton";

export default {
  name: "Landing",

  components: { BaseButton },
};
</script>

<template>
  <div class="landing">
    <h1>Bienvenue sur votre réseau interne Groupomania</h1>

    <div class="landing__directions">
      <BaseButton tag="router-link" to="/signup" isBigGreenBtn>
        S'inscrire
      </BaseButton>
      <BaseButton tag="router-link" to="/login" isBigGreenBtn>
        Se connecter
      </BaseButton>
    </div>
  </div>
</template>

<style scope lang="scss">
.landing {
  height: 100vh;
  @include flexbox(center, column, center);

  background-image: url("../../public/images/fond.png");
  background-origin: border-box;
  background-size: cover;
  background-position: center;
  color: $clear-color;

  &__directions {
    @include flexbox(center, row, center);

    @media screen and (max-width: $break-small) {
      @include flexbox(center, column, center);
    }
  }
}
</style>
