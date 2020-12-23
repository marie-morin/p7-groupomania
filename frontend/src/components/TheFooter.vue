<script>
export default { name: "TheFooter" };
</script>


<template>
  <div class="footer">
    <img src="../../public/images/icon-white.png" alt="Logo" class="footer__logo" />
  </div> 
</template>


<style scoped lang="scss">
.footer {
  width: 100%;
  @include flexbox(center, row, center);
  background-color: $primary-color;

  &__logo {
    width: 15%;
    min-width: 17rem;
    margin: $marged-centered-margin;
  }
}
</style>