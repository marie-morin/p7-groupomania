<template>
  <div class="post">
    <div class="post-likes">
      <font-awesome-icon class="icon up" icon="arrow-up" />
      <p class="likes">{{ post.likes }}</p>
      <font-awesome-icon class="icon down" icon="arrow-down" />
    </div>

    <div class="post-content">
      <p class="meta">Par {{ post.User.username }}, il y a</p>
      <p class="title">{{ post.title }}</p>
      <p class="text">{{ post.content }}</p>

      <div class="post-comments">
        <font-awesome-icon class="icon comment" icon="comment" />
        <p>{{ post.comments }} commentaires</p>
      </div>

      <Comment />
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  //   components: { Comment },
  //   props: {
  //     post: {
  //       type: Object,
  //       required: true,
  //     },
  //   },
};
</script>

<style scope lang="scss">
// .post {
//   width: 100%;
//   height: 100%;
//   padding: 0;
//   @include flexbox(flex-start, row, stretch);
//   background-color: $groupomania-background;
//   color: $groupomania-font-blue;
//   border-radius: $radius;
//   border: 1px solid $groupomania-medium-grey;
//   text-align: left;

//   &-likes {
//     width: 40px;
//     min-height: 100%;
//     margin: 0;
//     padding: 0;
//     background-color: $groupomania-back-grey;
//     @include flexbox(center, column, center);
//   }

//   &-content {
//     width: 100%;
//     padding: 5px;
//   }

//   &-comments {
//     @include flexbox(flex-start, row, center);

//     p {
//       margin: 0 0 0 5px;
//     }
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

//   .likes {
//     margin: 5px 0;
//     font-weight: bold;
//     color: $groupomania-police;
//   }

//   .meta {
//     font-style: italic;
//     font-weight: lighter;
//     color: $groupomania-light-grey;
//     margin: 0;
//   }

//   .title {
//     font-weight: bold;
//     font-size: 27px;
//     margin: 10px 0;
//   }

//   .text {
//     font-size: 20px;
//     margin: 5px 0;
//   }
// }
</style>
