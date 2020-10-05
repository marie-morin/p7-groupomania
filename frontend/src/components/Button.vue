<template>
  <a :href="url">{{ text }}</a>
</template>

<script>
export default {
  name: "Button",
  props: ["url", "text"],
};
</script>

<style scope lang="scss">
a {
  margin: 0 10px;
  padding: 10px 20px;

  border-radius: 5px;

  background-color: rgb(196, 58, 72);
  color: white;

  font-weight: bold;
  text-decoration: none;
  text-transform: uppercase;
}
</style>
