<template>
  <div class="form-section">
    <div class="form-container">
      <form action="" class="form">
        <h1>{{ title }} !</h1>
        <div class="form-inputs">
          <label for="email">Email</label>
          <input type="text" name="email" id="email" /><br />

          <label for="name">Nom d'utilisateur</label>
          <input type="text" name="name" id="name" /><br />

          <label for="password">Mot de passe</label>
          <input type="text" name="password" id="password" /><br />

          <label for="bio">Biographie</label>
          <input type="text" name="bio" id="bio" /><br />
        </div>

        <Button url="/login" v-bind:text="title" />
      </form>
    </div>
    <p>
      {{ question }} ? <a class="option" href="@">{{ option }}</a> !
    </p>
  </div>
</template>

<script>
import Button from "@/components/Button";

export default {
  name: "Form",
  props: ["title", "label", "placeholder", "question", "option"],
  components: {
    Button,
  },
};
</script>

<style scope lang="scss">
.form {
  width: 100%;
  margin: 0 auto;
  background-color: $groupomania-back-grey;
  border-radius: 5px;

  &-container {
    width: 30%;
    margin: 0 auto;
    padding: 40px;
    background-color: $groupomania-back-grey;
    border-radius: 10px;
    border: 3px solid $groupomania-red;
  }

  &-inputs {
    margin: 30px 0;
    text-align: left;
  }

  input {
    width: 100%;
    height: 40px;
    margin: 5px 0 20px 0;
    border: none;
    border-radius: 5px;
  }

  label {
    color: $groupomania-font-blue;
  }
}

.option {
  color: $groupomania-red;
  text-transform: none;
}
h1 {
  margin: 0;
  color: $groupomania-font-blue;
}
</style>
