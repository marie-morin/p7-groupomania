<script>
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
  <div id="app" class="app">
    <div :class="{ fullheight: !isLoged }" class="app__topcontent">
      <TheHeader v-if="isLoged" />
      <router-view class="app__router"/>
      <ThePopup v-if="popup.isDisplayed" />
    </div>
    <TheFooter v-if="isLoged"/>
  </div>
</template>


<style lang="scss">
.app {
  min-height: 100vh;
  @include flexbox(space-between, column, center);
  position: relative;

  background-color: $clear-color;
  color: $police-color;

  text-align: center;
  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  &__topcontent {
    min-width: 100%;
    min-height: 100%;
    @include flexbox(center, column, center);
  }

  &__router {
    width: 100%;
  }
}

.fullheight {
  min-height: 100vh;
}
</style>

