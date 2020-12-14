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
      class="btn"
    >
      <slot />
    </component>

    <button v-else @click.prevent.stop="onClick" class="btn btn-animate">
      <slot />
    </button>    
  </div>
</template>

<style scoped lang="scss">
.btn {
  display: inline-block;
  padding: 15px 40px;

  color: #fff;
  background-color: #2dce89;

  border-radius: 100px;
  border: none;

  text-align: center;
  text-transform: uppercase;

  cursor: pointer;

  transition: all .2s;
}

.btn:hover {
  transform: translateY(-3px);
}

.btn:active {
    transform: translateY(-1px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}
</style>