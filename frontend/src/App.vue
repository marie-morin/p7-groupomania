<template>
  <div id="app">
    <router-view />
    <Popup v-if="popup.isDisplayed" />
  </div>
</template>

<script>
import Popup from '@/components/Popup.vue';
import { mapGetters } from 'vuex';

export default {
  name: "App",
  
  components: { Popup },

  computed: { ...mapGetters(['popup']) },
};
</script>

<style lang="scss">
#app {
  position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $groupomania-police;
}
</style>
