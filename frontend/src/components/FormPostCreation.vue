<script>
import { mapActions } from 'vuex';
import axios from "axios";
import ProgressBar from "vuejs-progress-bar";
import BaseButton from "@/components/BaseButton";

export default {
  name: "FormPostCreation",

  components: { ProgressBar, BaseButton },

  data() {
    const progressBarOptions = {
      text: {
        shadowColor: "black",
        fontSize: 14,
        fontFamily: "Helvetica",
        dynamicPosition: true
      },
      progress: {
        color: "#E8C401",
        backgroundColor: "#000000"
      },
      layout: {
        height: 35,
        width: 140,
        type: "line",
        progressPadding: 0,
        verticalTextAlign: 63
      }
    };

    return {
      file: null,
      imagePreview: null,
      formData: null,
      uploadProgress: 0,
      showProgressBar: false,
      progressBarOptions: progressBarOptions,
      newPost: {
        title: "",
        content: "",
        imageUrl: null,
      },
    };
  },

  methods: {
    ...mapActions(["add"]),

    selectFile(event) {
      this.imagePreview = URL.createObjectURL(event.target.files[0]);

      const reader = new FileReader();
      reader.onload = (e) => {
        this.file = e.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    },

    upload() {
      this.formData = new FormData();
      this.formData.append("upload_preset", process.env.VUE_APP_CLOUDINARY_PRESET);
      this.formData.append("file", this.file);

      let requestObj = {
        url: process.env.VUE_APP_CLOUDINARY_UPLOAD_URL,
        method: "POST",
        data: this.formData,
        onUploadProgress: function(progressEvent) {
          this.uploadProgress = Math.round(
            (progressEvent.loaded * 100.0) / progressEvent.total
          );
        }.bind(this)
      };
      this.showProgressBar = true;

      axios(requestObj)
        .then(response => {
          if (response.data.secure_url) {
            this.newPost.imageUrl = response.data.secure_url;
            this.addPost();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          setTimeout(
            function() {
              this.showProgressBar = false;
            }.bind(this),
            1000
          );
        });
    },

    addPost() {
      if (this.newPost.title == "" || this.newPost.content == "") {
        const contexte = {
          intention: "notification",
          message: "Vtre publication doit contenir un titre et du contenu !",
        };
        this.$store.commit("displayPopup", contexte);
        return;
      }

      const options = {
        url: process.env.VUE_APP_LOCALHOST_URL + "posts/",
        mutation: "newPost",
        data: this.newPost,
      }

      this.add(options);
      this.newPost.title = "";
      this.newPost.content = "";
      this.newPost.file = "";
    },
  },
};
</script>


<template>
  <div class="postForm">
    <form @submit.prevent="upload">
      <div v-show="showProgressBar">
        <progress-bar :options="progressBarOptions" :value="uploadProgress" />
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