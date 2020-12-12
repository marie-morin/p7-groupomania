<script>
export default {
  name: "BaseCardUser",

  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
  <router-link :to="{ name: 'Profil', params: { id: user.id } }">
    {{ user.firstname }} {{ user.lastname }}
  </router-link>
</template>

<style scope lang="scss"></style>