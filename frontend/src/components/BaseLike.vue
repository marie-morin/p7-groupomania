<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "BaseLike",

  props: {
    item: {
      type: Object,
      required: false,
    },
    urlEndpoint: {
      type: String,
      required: true,
    },
    rateMutation: {
      type: String,
      required: true,
    },
    setMutation: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      wasLiked: false,
      showUsers: false,
    };
  },

  computed: {
    ...mapGetters(["currentUser"]),
  },

  created() {
    const likesOptions = {
      url:
        process.env.VUE_APP_LOCALHOST_URL +
        `${this.urlEndpoint}/${this.item.id}/like`,
      mutation: this.setMutation,
    };
    this.fetch(likesOptions).then(() => {
      this.item.likes.forEach((like) => {
        if (like.UserId === this.currentUser.id) {
          return (this.wasLiked = true);
        }
      });
    });
  },

  methods: {
    ...mapActions(["fetch", "rate"]),

    like() {
      const options = {
        url: process.env.VUE_APP_LOCALHOST_URL + `${this.urlEndpoint}/like`,
        mutation: this.rateMutation,
        id: this.item.id,
        user: this.currentUser.id,
      };
      this.rate(options);
      this.wasLiked = !this.wasLiked;
    },
  },
};
</script>

<template>
  <div class="likes">
    <font-awesome-icon
      icon="thumbs-up"
      @click="like()"
      class="likes__icon"
      :class="{ liked: wasLiked }"
    />

    <p
      @mouseover="showUsers = true"
      @mouseout="showUsers = false"
      class="likes__amout"
    >
      {{ item.likes.length }}
    </p>

    <div class="likes__users" v-if="item.likes.length > 0 && showUsers">
      <p v-for="like in item.likes" :key="like.id">{{ like.User.username }}</p>
    </div>
  </div>
</template>

<style scope lang="scss">
.likes {
  @include flexbox(flex-start, row, flex-start);
  // padding: 10px 20px;
  padding: 10px 0px 10px 20px;
  position: relative;

  &__amout {
    margin: 0;
    // cursor: pointer
  }

  &__icon {
    margin: 0 5px 0 0;
    cursor: pointer;
  }

  &__users {
    width: 150px;
    position: absolute;
    top: 40px;
    // left: -165px;
    // top: 40px;
    padding: 15px;
    border-radius: $small-radius;
    background-color: $clear-color;
    box-shadow: $shadow;
    // @include flexbox(flex-start, column, center);
    border-radius: $small-radius;
    z-index: 1;

    p {
      margin: 0;
      padding: 0;
    }
  }
}

.liked {
  color: $success-color;
}
</style>
