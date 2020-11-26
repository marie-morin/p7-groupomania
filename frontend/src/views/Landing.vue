<template>
  <div class="landing">
    <div class="content">
      <div class="bienvenue">
        <h1>Bienvenue sur votre réseau interne Groupomania</h1>
      </div>
      <div class="redirection">
        <Button url="/signup" text="S'inscrire" class="btn" />
        <Button url="/login" text="Se connecter" class="btn" />
      </div>
    </div>
  </div>
</template>

<script>

import Button from "@/components/Button";
export default { name: "Landing", components: { Button } };

</script>

<style scope lang="scss">
.landing {
  height: 100vh;
  @include flexbox(center, column, center);
  background-image: url("../../public/images/fond.png");
  background-size: cover;
}

.content {
  @include flexbox(center, column, center);
}

.redirection {
  @media screen and (max-width: 400px) {
    @include flexbox(center, column, center);
  }
}

.btn {
  @media screen and (max-width: $x-small) {
    margin-top: 20px;
  }
}
</style>
