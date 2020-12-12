// <script>
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
      <div>
        <TheHeader />
        <div>
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
}
</style>

