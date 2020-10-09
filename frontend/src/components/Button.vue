<template>
  <a class="global-btn" :href="url">{{ text }}</a>
</template>

<script>
export default {
  name: "Button",
  props: ["url", "text"],
};
</script>

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
