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
    return { matcheditems: [] };
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

    closeByBlur() { this.matcheditems = [] }
  },
};
</script>


<template>
  <div class="search">
    <label for="search" class="search__label">Rechercher un utilisateur</label>
    <input type="text" id="search" placeholder="Rechercher un utilisateur..." @input="search" class="search__input" />

    <div class="search__results" :class="{ display : matcheditems.length > 0 }">
      <BaseCardUser v-for="item in matcheditems" :key="item.id" :user="item" tabindex="0"/>
    </div>
  </div>
</template>


<style scope lang="scss">
.search {
  width: 100%;
  position: relative;

  &__label {
    display: none;
  }

  &__input {
    width: 30rem;
    height: 5rem;
    margin: $marged-centered-margin;
    padding: $base-padding;

    background-color: $base-color;
    color: $police-color;

    border: none;
    border-radius: $medium-radius;

    font-size: 1.8rem;
    font-family: inherit;
    font-weight: inherit;
  }

  &__results {
    width: 30rem;
    display: none;
    position: absolute;
    left: 50%;
    padding: $base-padding;

    background-color: $base-color;

    box-shadow: $shadow;
    border-radius: $small-radius;

    transform: translate(-50%, 0);
  }
}

.display {
  display: block;
}
</style>
