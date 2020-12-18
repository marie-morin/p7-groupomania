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

  computed: {
  ...mapGetters(["currentUser", "popup"])

  }
};
</script>

<template>
    <router-link :to="{ name: 'Profil', params: { id: user.id } }" class="user">
      <!-- <img :src="currentUser.imageUrl" alt="currentUser.username" class="avatar"> -->
      <BaseAvatar :user="user" origin="comment" />
      {{ user.firstname }} {{ user.lastname }}
    </router-link>
</template>

<style scope lang="scss">
.user {
  display: block;
  cursor: pointer;
  width: 20rem;
  @include flexbox(center, column, center);
  margin: $centered-margin;
  padding: $base-padding;
  color: $police-color;
  border-radius: $medium-radius;
  font-family: inherit;
  text-decoration: none;

  &:hover {
    box-shadow: $shadow;
  }

  &:active {
    box-shadow: $shadow;
  }
}
</style>