<template>
  <div class="post-section">
    <div class="post">
      <div class="post-likes">
        <i></i>
        <p>5</p>
        <i></i>
      </div>
      <div class="post-content">
        <p>Par {{ name }}, il y a {{ date }}</p>
        <p>{{ title }}</p>
        <p>{{ content }}</p>
        <div class="post-icons">
          <i></i>
          <p>{{ comments }} commentaires</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Post",
  props: ["name", "date", "title", "content", "comments"],
};
</script>

<style scope lang="scss">
.post {
  width: 40%;
  margin: 0 auto;
  padding: 10px;
  @include flexbox(flex-start);
  background-color: $groupomania-background;
  color: $groupomania-font-blue;
  border-radius: 10px;
  border: 3px solid $groupomania-red;
  text-align: left;

  &-likes {
    background-color: $groupomania-back-grey;
  }
}

.option {
  color: $groupomania-red;
  text-transform: none;
}
</style>
