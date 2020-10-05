<template>
  <div class="footer">
    <div class="inner">
      <img src="../../public/images/icon-white.png" alt="Logo" class="logo" />
      <div id="nav">
        <router-link to="/home">Accueil</router-link>
        <router-link to="/profil">Profil</router-link>
        <a href="#">Déconnexion</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.footer {
  width: 100%;
  background-color: rgb(15, 27, 50);
}

.inner {
  width: 60%;
  margin: 0 auto;
  @include flexbox(space-between);
}

.logo {
  width: 10%;
}

#nav {
  a {
    padding-left: 20px;
    text-decoration: none;
    color: white;
  }
}
</style>
