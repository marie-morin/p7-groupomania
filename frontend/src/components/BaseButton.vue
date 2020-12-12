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
  <div>
    <component
      :is="type"
      v-if="!onClick"
      :href="href"
      :to="to"
      class="global-btn"
    >
      <slot />
    </component>

    <button v-else @click.prevent.stop="onClick" class="global-btn">
      <slot />
    </button>
  </div>
</template>

<style scoped lang="scss"></style>