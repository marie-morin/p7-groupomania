<script>
export default {
  name: "BaseButton",

  props: {
    href: {
      type: String,
      default: null,
    },
    to: {
      type: String,
      default: null,
    },
    onClick: {
      type: Function,
      default: null,
    },
  },

  computed: {
    type() {
      if (this.href) {
        return "a";
      }
      if (this.to) {
        return "router-link";
      } else {
        return "button";
      }
    },
  },
};
</script>

<template>
  <div class="btn">
    <component
      :is="type"
      v-if="!onClick"
      :href="to"
      :to="to"
      class="global-btn"
      tabindex="0"
    >
      <slot />
    </component>

    <button
      v-else
      @click.prevent.stop="onClick"
      @keydown.enter="onClick"
      class="global-btn"
      tabindex="0"
    >
      <slot />
    </button>    
  </div>
</template>

<style scoped lang="scss">
.btn {
  margin: 0.5rem;
}
</style>