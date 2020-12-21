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
    style: {
      type: String,
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
      :class="{ }"
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

.global-btn {
  display: block;
  margin: $centered-margin;
  // padding: 1.5rem 4rem;

  // background-color: $success-color;
  // color: $clear-color;

  border: none;
  // border-radius: $medium-radius;

  font-size: 1.9rem;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;

  cursor: pointer;
  // transition: all .2s;

  // &:hover {
  //   transform: translateY(-0.3rem);
  // }

  // &:active {
  //   transform: translateY(-0.1rem);
  //   box-shadow: $shadow;
  // }

  &--big {
    padding: 1.5rem 4rem;
    background-color: $success-color;
    color: $clear-color;
    border-radius: $medium-radius;
    transition: all .2s;

    &:hover {
      transform: translateY(-0.3rem);
    }

    &:active {
      transform: translateY(-0.1rem);
      box-shadow: $shadow;
    }

    
  }
}
</style>