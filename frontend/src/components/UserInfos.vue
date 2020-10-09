<template>
  <div class="page-content">
    <h1>Bienvenue {{ name }} !</h1>
    <div class="infos-container">
      <h3>Email :</h3>
      <p>mariemorin@gmail.com</p>
      <h3>Nom d'utilisateur :</h3>
      <p>Marie Morin</p>
      <h3>Biographie :</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit fuga
        accusamus reprehenderit alias perspiciatis repellat molestiae, rem
        suscipit eaque quisquam et numquam ratione tempora quibusdam magni
        temporibus excepturi, repudiandae beatae!
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Form",
  props: ["name", "label", "placeholder", "question", "option"],
};
</script>

<style scope lang="scss">
h1 {
  margin: 0;
  color: $groupomania-red;
  text-align: center;
  margin-bottom: 20px;
}
h3 {
  margin: 0;
  color: $groupomania-font-blue;
}
p {
  margin-top: 5px;
}
.infos {
  width: 100%;
  margin: 0 auto;
  background-color: $groupomania-back-grey;

  &-container {
    width: 40%;
    margin: 0 auto;
    padding: 30px;
    background-color: $groupomania-back-grey;
    border-radius: $radius;
    border: 2px solid $groupomania-red;
    text-align: left;
    color: $groupomania-font-blue;

    @media screen and(max-width: $large + 100) {
      width: 70%;
    }
    @media screen and(max-width: $small) {
      width: 90%;
      padding: 40px 10px;
    }
  }
}

.option {
  color: $groupomania-red;
  text-transform: none;
}
</style>
