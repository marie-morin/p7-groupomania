<template>
  <div class="postForm">
    <form action="">
      <h2>Partager avec vos collègues :</h2>

      <input type="text" name="title" id="title" placeholder="Titre" /> <br />

      <input
        type="text"
        name="content"
        id="content"
        placeholder="Que voulez-vous partager ?"
      />
      <div class="btn">
        <input type="submit" class="submit" :value="title" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "PostForm",
};
</script>

<style scope lang="scss">
.postForm {
  width: 50%;
  margin: 30px auto 0 auto;
  color: $groupomania-font-blue;
  border-radius: $radius;
  border: 1px solid $groupomania-medium-grey;
  text-align: left;
  padding: 10px;
  background-color: $groupomania-light-grey;
}
form {
  width: 100%;
}

input {
  width: 100%;
  height: 40px;
  margin-top: 10px;
  font-weight: bold;
  font-size: 20px;
  color: $groupomania-font-blue;
}

h2 {
  margin: 5px 0;
}
.btn {
  width: 40%;
  margin: 0 auto;
}

.submit {
  display: block;
  border-radius: $radius;
  background-color: $groupomania-red;
  color: $groupomania-police;
  font-weight: bold;
  text-transform: uppercase;
  border: none;
  margin: 10px 0;

  &:hover {
    background-color: darken($color: $groupomania-red, $amount: 5);
  }
}
</style>
