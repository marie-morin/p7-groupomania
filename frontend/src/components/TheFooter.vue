<script>
export default {
  name: "TheFooter",

  data: () => ({
      links: [
        'Home',
        'About Us',
        'Team',
        'Services',
        'Blog',
        'Contact Us',
      ],
    }),
};
</script>


<template>
  <v-footer
    color="primary lighten-1"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        text
        rounded
        class="my-2"
      >
        {{ link }}
      </v-btn>
      <v-col
        class="primary lighten-2 py-4 text-center white--text"
        cols="12"
      >
        <!-- {{ new Date().getFullYear() }} — <strong>Vuetify</strong> -->
        <img src="../../public/images/icon-white.png" alt="Logo" class="logo" />

      </v-col>
    </v-row>
  </v-footer>
</template>

<style scoped lang="scss">
// .footer {
//   width: 100%;
//   height: 10vh;
//   @include flexbox(center);
//   background-color: rgb(15, 27, 50);
// }

// .inner {
//   width: 60%;
//   margin: 0 auto;
//   @include flexbox(center);
// }

.logo {
  width: 15%;
  min-width: 150px;
  // margin: 20px auto;
}
</style>
