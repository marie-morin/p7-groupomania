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
  <div class="post-likes">
    <p
      @mouseover="showUsers = true"
      @mouseout="showUsers = false"
      class="likes"
    >
      {{ item.likes.length }}
    </p>
    <div v-if="showUsers">
      <p v-for="like in item.likes" :key="like.id">{{ like.User.username }}</p>
    </div>

    <font-awesome-icon
      icon="arrow-up"
      @click="like()"
      :class="{ liked: wasLiked }"
      class="icon up"
    />
  </div>
</template>

<style scope lang="scss">
// .post {

//   &-likes {
//     // width: 40px;
//     min-height: 100%;
//     margin: 0;
//     padding: 0;
//     background-color: $groupomania-back-grey;
//     @include flexbox(center, column, center);
//   }

//   .icon {
//     color: $groupomania-police;
//     font-size: 20px;
//     margin: 0;
//     &.up {
//       &:hover {
//         color: green;
//       }
//     }
//     &.down {
//       &:hover {
//         color: red;
//       }
//     }
//     &.comment {
//       color: $groupomania-light-grey;
//     }
//   }
// }

// .liked {
//   background-color: green;
// }
</style>
