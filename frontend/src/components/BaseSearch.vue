<script>
import BaseCardUser from "@/components/BaseCardUser.vue";
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
    }
  },
};
</script>


<template>
  <div>
    <label for="pays">Rechercher un utilisateur :</label>
    <input
      type="text"
      id="pays"
      @input="search"
    >
    <div id="suggestions">
        <BaseCardUser
          v-for="item in matcheditems"
          :key="item.id"
          :user="item"
        />
    </div>
  </div>
</template>


<style scope lang="scss">
.suggestion {
    padding-left: 2px;
    padding-right: 2px;
}

/* Modifie la couleur de la suggestion survolée par la souris */
.suggestion:hover {
    background-color: #adf;
    cursor: pointer;
}

/* Positionne la liste des suggestions au-dessous de la zone de saisie */
#suggestions {
    // position: absolute;
    border: 1px solid black;
    left: 171px;
}
</style>