<script>
import BaseCardUser from "@/components/BaseCardUser";

export default {
  name: "BaseSearch",

  components: { BaseCardUser },

  props: {
    items: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      matcheditems: [],
    };
  },

  methods: {
    search(event) {
      const inputValue = event.target.value;
      this.matcheditems = [];

      for (let item of this.items) {
        const matchableItem = item.username.toLowerCase();
        if (matchableItem.indexOf(inputValue) !== -1) {
          this.matcheditems.push(item);
        }
      }

      if (event.target.value.length === 0) {
        this.matcheditems = [];
      }
    },

    blur() {
      this.matcheditems = [];
    }
  },
};
</script>

<template>
  <div class="search">
    <input type="text" id="pays" placeholder="Rechercher un utilisateur..." @input="search" @blur="blur" class="search__input" />
    <div class="search__results" :class="{ display : matcheditems.length > 0 }">
      <BaseCardUser v-for="item in matcheditems" :key="item.id" :user="item" />
    </div>
  </div>
</template>

<style scope lang="scss">
.search {
  width: 100%;
  position: relative;

  &__input {
    width: 300px;
    height: 50px;

    margin: 20px auto;
    padding: 5px 15px;

    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;

    border: none;
    border-radius: 15px;

    background-color: rgb(228, 226, 226);
    color: grey;

  }

  &__results {
    width: 300px;

    display: none;

    position: absolute;
    left: 50%;

    padding: 15px;

    border-radius: 3px;
    box-shadow: 0px 3px 15px rgba(0,0,0,0.2);

    background-color: rgb(228, 226, 226);

    transform: translate(-50%, 0);
  }
}

.display {
  display: block;
}
</style>
