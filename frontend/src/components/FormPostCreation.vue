<script>
import { mapActions } from 'vuex';
import BaseButton from "@/components/BaseButton";
import axios from "axios";

export default {
  name: "FormPostCreation",

  components: { BaseButton },

  data() {
    return {
      file: null,
      imagePreview: null,
      progress: 0,
      newPost: {
        title: "",
        content: "",
      },
    };
  },

  methods: {
    ...mapActions(["add"]),

    selectFile(event) {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      this.file = event.target.files[0] || event.dataTransfer.files;

      // if(!allowedTypes.includes(this.file.type) || this.file.size > 1000000) {
      if(!allowedTypes.includes(this.file.type)) {
        const contexte = {
          intention: "notification",
          message: "Vous devez selectionner des images (.jpeg, .jpg ou .png) ou des gif (.gif) de moins de 1 Mo !",
        };
        this.$store.commit("displayPopup", contexte);
        this.file = null;
        return;

      } 
      else {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result;
        }
        reader.readAsDataURL(event.target.files[0]);
      }
    },

    addPost() {
      let formData = new FormData();

      formData.append('file', this.file);
      formData.append('content', JSON.stringify(this.newPost));

      if (this.newPost.title == "" || this.newPost.content == "" || formData.get("file") == "null" || formData.get("content") == "null") {
        const contexte = {
          intention: "notification",
          message: "Vtre publication doit contenir un titre, du contenu et une image !",
        };
        this.$store.commit("displayPopup", contexte);
        return;

      } else {
        axios.post( 
          'http://localhost:3000/api/posts/',
          formData,
          { 
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: "Bearer " + localStorage.getItem("jwt").replace(/['"']+/g, "")
            }
          },
          { onUploadProgress: ProgressEvent => {
              let progress =
                Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
                +"%";
              this.progress = progress;
            } }
        )
          .then((response) => {
            console.log(response);

            this.$store.commit("newPost", response.data);
  
            this.newPost.title = "";
            this.newPost.content = "";
            this.file = null,
            this.imagePreview = "";

            this.$refs.inputFile.value = ''

          })
          .catch((error) => {
            console.error(error);
          });
      }
      // const options = {
      //   url: process.env.VUE_APP_LOCALHOST_URL + "posts/",
      //   mutation: "newPost",
      //   data: this.newPost,
      // }
      // this.add(options);
    },
  },
};
</script>


<template>
  <div class="postForm">
    <form enctype="multipart/form-data" @submit.prevent="addPost">
      
      <div class="progess-bar" :style="{'width': progress}">
        {{progress}}
      </div>

      <h2>Partager avec vos collègues :</h2>

      <input
        type="text"
        id="title"
        name="title"
        placeholder="Titre"
        required
        v-model="newPost.title"
      />
      <br />

      <input
        type="text"
        id="content"
        name="content"
        placeholder="Que voulez-vous partager ?"
        required
        v-model="newPost.content"
      />

      <input
        type="file"
        id="file-input"
        ref="inputFile"
        accept="image/png, image/jpg, image/jpeg, image/gif"
        @change="selectFile($event)"
      />

      <section v-show="imagePreview">
        <img :src="imagePreview" class="image"/>
      </section>
      
      <div class="btn">
        <BaseButton>Publier</BaseButton>
      </div>
    </form>
  </div>
</template>

<style scope lang="scss">
.postForm {
  // width: 50%;
  margin: 0 auto;
  color: $groupomania-font-blue;
  border-radius: $radius;
  border: 1px solid $groupomania-medium-grey;
  text-align: left;
  padding: 10px;
  background-color: $groupomania-background;
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

.cl-upload {
  background-color: cadetblue;
  margin: 10px;
  padding: 10px;
}
</style>