<script>
import { mapGetters } from 'vuex';
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import ThePopup from '@/components/ThePopup.vue';
export default {
  name: "App",
  components: { TheHeader, TheFooter, ThePopup },
  computed: { ...mapGetters(['popup']) },
};
</script>


<template>
  <div id="app">
      <div class="top-content">
        <TheHeader />
        <div class="content">
          <router-view />
          <ThePopup v-if="popup.isDisplayed" />
        </div>
      </div>

      <TheFooter />
  </div>
</template>


<style lang="scss">
#app {
  position: relative;
  // @include flexbox(space-between, column, center);
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: $groupomania-police;
}
</style>


