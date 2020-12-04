<script>
  export default {
    name: "BaseButton",

    props: {
      href: {
        type: String,
        default: null
      },
      to: {
        type: String,
        default: null
      },
      onClick: {
        type: Function,
        default: null
      }
    },

    computed: {
      type() {
        if (this.href) {
          return 'a'
        } 
        if (this.to) {
          return 'router-link'
        } 
        else {
          return 'button'
        }
      }
    }
  }
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
    <slot/>
  </component>

  <button
    v-else
    @click.prevent.stop="onClick"
    class="global-btn"
  >
    <slot/>
  </button>
</div>
</template>


<style scoped lang="scss">
.global-btn {
  margin: 0 10px;
  padding: 10px 20px;

  border-radius: $radius;

  background-color: $groupomania-red;
  color: white;

  font-weight: bold;
  text-decoration: none;
  text-transform: uppercase;

  &:hover {
    background-color: darken($color: $groupomania-red, $amount: 5);
  }
}
</style>