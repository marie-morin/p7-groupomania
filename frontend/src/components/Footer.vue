<template>
  <div class="footer">
    <div class="inner">
      <img src="../../public/images/icon-white.png" alt="Logo" class="logo" />
    </div>
  </div>
</template>

<script>
export default { name: "Footer" };
</script>

<style scoped lang="scss">
.footer {
  width: 100%;
  height: 10vh;
  @include flexbox(center);
  background-color: rgb(15, 27, 50);
}

.inner {
  width: 60%;
  margin: 0 auto;
  @include flexbox(center);
}

.logo {
  width: 15%;
  min-width: 150px;
  margin: 20px auto;
}
</style>
