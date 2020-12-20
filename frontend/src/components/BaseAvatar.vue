<script>

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
    isLarge() {
      return this.origin == "profil";
    }
  }
};
</script>

<template>
  <div class="avatar">
    <img
      v-if="user.imageUrl"
      :src="user.imageUrl"
      :alt="user.username"
      :class="{ large : isLarge }"
      class="avatar__image"
    />
    <div
      v-else
      :class="{ large : isLarge }"
      class="avatar__image avatar__image--empty"
    >
      {{ this.user.firstname.split('')[0] }}{{ this.user.lastname.split('')[0] }}
    </div>
  </div>
</template>

<style scope lang="scss">

.avatar {

  &__image {
    width: 3.5rem;
    height: 3.5rem;
    margin-right: 1rem;
    border-radius: $round-radius;
    object-fit: cover;

    &--empty {
      @include flexbox(center, row, center);
      background-color: $base-color;
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