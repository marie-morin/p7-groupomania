<script>
export default {
  name: "TheFooter",
};
</script>


<template>
  <div class="footer">
    <img src="../../public/images/icon-white.png" alt="Logo" class="logo" />
  </div> 
</template>

<style scoped lang="scss">
.footer {
  width: 100%;
  @include flexbox(center, row, center);
  background-color: $groupomania-red;
}
.logo {
  width: 15%;
  min-width: 170px;
  margin: 15px auto;
}
</style>
