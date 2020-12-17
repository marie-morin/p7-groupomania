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

    <img :src="currentUser.imageUrl" alt="currentUser.username" class="user__image">

    <router-link :to="{ name: 'Profil', params: { id: user.id } }" class="user__link">
      {{ user.firstname }} {{ user.lastname }}
    </router-link>

  </div>
</template>

<style scope lang="scss">
.user {
  color: inherit;
  // background-color: lightgreen;
  @include flexbox(flex-start, row, center);
  // margin-top: 30px;
  padding: 15px 20px;
  border-radius: 20px;

  &:hover {
    box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
  }

  &--active {
    box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
  }

  &__image {
    width: 35px;
    height: 35px;
    margin-right: 10px;
    border-radius: 50%;
  }

  &__link {
    text-decoration: none;
    font-size: inherit;
    font-family: inherit;

  }
}
</style>