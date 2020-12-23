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

  computed: mapGetters(["currentUser"]),

  created() {
    // Récuperation des likes de l'item
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

    <!-- Bouton thumbup pour liker -->
    <font-awesome-icon
      icon="thumbs-up"
      @click="like()"
      @keydown.enter="like()"
      class="likes__icon"
      :class="{ liked: wasLiked }"
      tabindex="0"
    />

    <!-- Nombre de likes -->
    <p @mouseover="showUsers = true" @mouseout="showUsers = false" class="likes__amout">
      {{ item.likes.length }}
    </p>

    <!-- Div popup affichant les utilisateur qui ont liké -->
    <div v-if="item.likes.length > 0 && showUsers" class="likes__users">
      <p v-for="like in item.likes" :key="like.id">{{ like.User.username }}</p>
    </div>
  </div>
</template>


<style scope lang="scss">
.likes {
  @include flexbox(flex-start, row, flex-start);
  position: relative;

  &__icon {
    margin: 0 0.5rem 0 0;
    cursor: pointer;
  }

  &__amout {
    margin: 0;
  }

  &__users {
    width: 15rem;
    position: absolute;
    top: 4rem;
    padding: $base-padding;

    background-color: $clear-color;

    box-shadow: $shadow;
    border-radius: $small-radius;
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