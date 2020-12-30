<script>
import { mapGetters } from "vuex";

export default {
  name: "BaseAvatar",

  props: {
    user: {
      type: Object,
      required: true,
    },
    origin: {
      type: String,
      default: null,
      required: false,
    }
  },

  computed: {
    ...mapGetters(["currentUser"]),

    isFullSizeImage() { return this.origin == "profil" }
  }
};
</script>


<template>
  <div class="avatar">
    <!-- Si l'utilisateur à ajouté une photos de profil -->
    <img
      v-if="user.imageUrl"
      :src="user.imageUrl"
      :alt="user.username"
      :class="{ large : isFullSizeImage }"
      class="avatar__image"
    />

    <!-- Si utilisateur n'a pas de photo de profil, affichage de ses initales à la place de l'image -->
    <div v-else-if="currentUser" :class="{ large : isFullSizeImage }" class="avatar__image avatar__image--empty">
      {{ this.user.firstname.split('')[0] }}{{ this.user.lastname.split('')[0] }}
    </div>
  </div>
</template>


<style scope lang="scss">
.avatar {
  margin-right: 0.5rem;

  &__image {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: $round-radius;
    object-fit: cover;

    &--empty {
      margin: 0 auto;
      @include flexbox(center, row, center);
      background-color: darken($color: $base-color, $amount: 50);
      color: $clear-color;
      text-transform: uppercase;
    }

  }
}
.large {
  width: 20rem;
  height: 20rem;
  margin: 2rem 4rem;
  border-radius: $round-radius;
  font-size: 3rem;
  font-weight: 700;
}
</style>