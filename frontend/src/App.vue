<script>
import { mapGetters } from 'vuex';
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
// import ThePopup from '@/components/ThePopup.vue';

export default {
  name: "App",

  components: { TheHeader, TheFooter },
  // components: { TheHeader, TheFooter, ThePopup },

  computed: { ...mapGetters(['popup']) },
}
</script>


<template>
  <v-app id="inspire">

    <!-- Header -->
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-container class="py-0 fill-height">

        <the-header />

        <!-- <v-avatar
          class="mr-10"
          color="grey darken-1"
          size="32"
        ></v-avatar>

        <v-btn
          v-for="link in links"
          :key="link"
          text
        >
          {{ link }}
        </v-btn>

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive> -->
      </v-container>
    </v-app-bar>

    <!-- Contenue du router -->
    <v-main class="grey lighten-3">
      <v-container>
        <v-sheet
          min-height="70vh"
          rounded="lg"
        >
          <router-view></router-view>
        </v-sheet>
      </v-container>
    </v-main>

    <the-footer />
  </v-app>
</template>
