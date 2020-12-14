// <script>
import { mapGetters } from 'vuex';
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import ThePopup from '@/components/ThePopup.vue';

export default {
  name: "App",
  components: { TheHeader, TheFooter, ThePopup },
  computed: { 
    ...mapGetters(['currentUser', 'popup']),

    isLoged() { return this.currentUser.id != undefined },
  },
};
</script>


<template>
  <div id="app">
    <div :class="{ fullheight: !isLoged }" class="app__topcontent">
      <TheHeader v-if="isLoged" />
      <router-view :class="{ fullheight: !isLoged }"/>
      <ThePopup v-if="popup.isDisplayed" />
    </div>
    <TheFooter v-if="isLoged"/>
  </div>
</template>


<style lang="scss">
#app {
  position: relative;

  @include flexbox(space-between, column, center);
  background-color: burlywood;

  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: $groupomania-police;
  min-height: 100vh;

  text-align: center;

}
.app__topcontent {
  min-width: 100%;
  min-height: 100%;
  background-color: crimson;
}

.fullheight {
  min-height: 100vh;
}
</style>

