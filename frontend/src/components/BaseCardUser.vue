<script>
export default {
  name: "BaseCardUser",
  props: {
    user: {
      type: Object,
      required: true,
    }
  },  
};
</script>

<template>
  <div class="infos-container">
    <router-link :to="{ name: 'Profil', params: { id: user.id }}">
      {{ user.firstname }} {{ user.lastname }}
    </router-link>
  </div>
</template>




<style scope lang="scss">

p {
  margin-top: 5px;
}
.infos {
  width: 100%;
  margin: 0 auto;
  background-color: $groupomania-back-grey;

  &-container {
    width: 40%;
    margin: 20px auto;
    padding: 10px;
    background-color: $groupomania-back-grey;
    border-radius: $radius;
    border: 2px solid $groupomania-red;
    text-align: left;
    color: $groupomania-font-blue;
    cursor: pointer;

    @media screen and(max-width: $large + 100) {
      width: 70%;
    }
    @media screen and(max-width: $small) {
      width: 90%;
      padding: 40px 10px;
    }
  }
}
</style>
