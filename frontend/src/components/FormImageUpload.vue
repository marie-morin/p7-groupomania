<script>
import axios from "axios";
import ProgressBar from "vuejs-progress-bar";

export default {
  name: "CloudinaryUpload",

  components: { ProgressBar },

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
    };
  },
  methods: {
       
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
  }
};
</script>


<template>
  <div class="cl-upload">
    <input
      type="file"
      id="file-input"
      accept="image/png, image/jpg, image/jpeg, image/gif"
      @change="selectFile($event)"
    />

    <section v-show="imagePreview">
      <img :src="imagePreview" class="image"/>
    </section>

    <!-- <div v-show="showProgress">
      <progress-bar :options="options" :value="progress" />
    </div>

    <form v-on:submit.prevent="upload">
      <input
        type="file"
        id="file-input"
        accept="image/png, image/jpg, image/jpeg, image/gif"
        @change="handleFileChange($event)"
      />

      <button type="submit" :disabled="filesSelected < 1">Upload</button>
    </form>

    <section v-if="results && results.secure_url">
      <img :src="results.secure_url" :alt="results.public_id" />
    </section> -->
  </div>
</template>


<style scoped></style>