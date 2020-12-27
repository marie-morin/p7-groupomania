<script>
import { mapGetters } from "vuex";
import BaseAvatar from "@/components/BaseAvatar";

export default {
  name: "BaseCardUser",

  components: { BaseAvatar },

  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  computed: mapGetters(["currentUser"]),
};
</script>


<template>
  <router-link :to="{ name: 'Profil', params: { id: user.id } }" class="user">
    <BaseAvatar :user="user" origin="comment" class="center"/>
    {{ user.firstname }} {{ user.lastname }}
  </router-link>
</template>


<style scope lang="scss">
.user {
  width: 20rem;
  @include flexbox(center, column, center);
  display: block;
  margin: $centered-margin;
  padding: $base-padding;

  color: $police-color;

  border-radius: $medium-radius;

  font-family: inherit;
  text-decoration: none;
  
  cursor: pointer;

  &:hover {
    box-shadow: $shadow;
  }

  &:active {
    box-shadow: $shadow;
  }

  .center {
    margin: 0;
  }
}
</style>