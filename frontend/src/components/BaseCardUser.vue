<script>
import { mapGetters } from "vuex";

export default {
  name: "BaseCardUser",

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
  <div class="user">
    <img :src="currentUser.imageUrl" alt="currentUser.username" class="avatar">
    <router-link :to="{ name: 'Profil', params: { id: user.id } }" class="user__link">
      {{ user.firstname }} {{ user.lastname }}
    </router-link>
  </div>
</template>

<style scope lang="scss">
.user {
  @include flexbox(flex-start, row, center);
  padding: $base-padding;
  color: inherit;
  border-radius: $medium-radius;

  &:hover {
    box-shadow: $shadow;
  }

  &:active {
    box-shadow: $shadow;
  }

  &__link {
    color: $police-color;
    font-family: inherit;
    text-decoration: none;
  }
}
</style>