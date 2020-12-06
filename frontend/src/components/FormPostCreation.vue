<script>
// import { mapActions } from 'vuex';
// import BaseButton from "@/components/BaseButton";
// export default {
//   name: "FormPostCreation",

//   components: { BaseButton },

//   data() {
//     return {
//       newPost: {
//         title: "",
//         content: "",
//         file: null,
//       },
//     };
//   },

//   methods: {
//     ...mapActions(["add"]),

//     uploadFile(event) {
//       console.log(event);

//       this.newPost.file = event.target.files[0] || event.dataTransfer.files;

//       console.log(this.newPost.file);

      
//       let test = event.target;

//       console.log(test);
//       console.log(test.files);
//       console.log(test.files);

//       // if (input.files && input.files[0]) {
//       //   let reader = new FileReader();
//       //   reader.onload = (e) => {
//       //       this.newPost.file = event.target.result;
//       //   }
//       //   reader.readAsDataURL(input.files[0]);
//       // }
//     },

//     addPost() {
//       if (this.newPost.title == "" || this.newPost.content == "") {
//         const contexte = {
//           intention: "notification",
//           message: "Vtre publication doit contenir un titre et du contenu !",
//         };
//         this.$store.commit("displayPopup", contexte);
//         return;
//       }

//       const options = {
//         url: process.env.VUE_APP_LOCALHOST_URL + "posts/",
//         mutation: "newPost",
//         data: this.newPost,
//       }
//       this.add(options);
//       this.newPost.title = "";
//       this.newPost.content = "";
//     },
//   },
// };

import swal from 'sweetalert'
import ProgressBar from "vuejs-progress-bar";
import axios from "axios";
import jwt_decode from 'jwt-decode'
import { required, minLength, maxLength } from "vuelidate/lib/validators";
let tokenFetch = JSON.parse(localStorage.getItem('jwt'));
if(tokenFetch) {
    var decoded = jwt_decode(tokenFetch);
}
let userId
if(decoded != undefined) {
userId = decoded.userId
}
const gagURL = 'http://localhost:3000/gag/post'


export default {

  components: { ProgressBar },

  name: 'gagpost',

  props: {
     value: Boolean,
  },

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
      },
    };

    return {
        title: '',
        results: null,
        errors: [],
        file: null,
        filesSelected: 0,
        cloudName: "",
        preset: "qqke5g5g",
        tags: "browser-upload",
        progress: 0,
        showProgress: false,
        options: progressBarOptions,
        fileContents: null,
        formData: null,
        secure_url: '',
        isDisabled: true,
        submitted: false,
    }
  },

  validations: {
    title: { 
      required,
      minLength: minLength(3),
      maxLength: maxLength(50)
    },
  },

  computed: {
    isComplete () {
      return !this.title || !this.secure_url;
    }
  },

  methods: {

    handleFileChange: function(event) {
    // function to handle file info obtained from local
    // file system and set the file state
    
      console.log("handlefilechange", event.target.files);
      //returns an array of files even though multiple not used
      this.file = event.target.files[0];
      this.filesSelected = event.target.files.length;
    },

    prepareFormData: function() {
      this.formData = new FormData();
      this.formData.append("upload_preset", this.preset);
      this.formData.append("file", this.fileContents);
    },

    upload: function() {
      // function to handle form submit
      //no need to look at selected files if there is no cloudname or preset
      if (this.preset.length < 1 || this.cloudName.length != 0) {
          this.errors.push("You must enter a cloud name and preset to upload");
          return;
      } else {
          this.errors = [];
      }

      let reader = new FileReader();
      // attach listener to be called when data from file

      reader.addEventListener(
        "load",
        function() {
          this.fileContents = reader.result;
          this.prepareFormData();

          let cloudinaryUploadURL = `https://api.cloudinary.com/v1_1/groupogag/upload`;
          let requestObj = {
              url: cloudinaryUploadURL,
              method: "POST",
              data: this.formData,
              onUploadProgress: function(progressEvent) {
              this.progress = Math.round(
                  (progressEvent.loaded * 100.0) / progressEvent.total
              );
              //bind "this" to access vue state during callback
              }.bind(this)
          };

          //show progress bar at beginning of post
          this.showProgress = true;
          axios(requestObj)
            .then(response => {
              this.results = response.data;
              this.secure_url = this.results.secure_url
            })
            .catch(error => {
              this.errors.push(error);
            })
            .finally(() => {
              setTimeout(
                  function() {
                  this.showProgress = false;
                  }.bind(this),
                  1000
              );
            });
        }.bind(this),
        false
      );

      // call for file read if there is a file
      if (this.file && this.file.name) {
          reader.readAsDataURL(this.file);
      }
    },

    formSubmit() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.axios.post(
        gagURL,
        {
          title: this.title,
          content: this.secure_url,
          userId: userId 
        },
        { headers: { Authorization: `Bearer ${tokenFetch}` }}
      )
        .then(response => {
          // Handle success.
          console.log(response)
          swal('Gag publié !', 'Votre publication a été mise en ligne', 'success')
          window.location.reload();
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error.response);
          swal("Quelque chose n'a pas fonctionné", "", "error")
        })
    },

    validate () {
      this.$refs.form.validate()
    },
  },
}
</script>


<template>
  <div class="postForm">
    <form @submit.prevent="addPost">
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
        type="file"
        id="image"
        name="image"
        accept="image/*"
        placeholder="Choisir un fichier"
        @change="uploadFile"
      />

      <div v-if="newPost.file">
        <img :src="newPost.file" height="100px">
      </div>


      <input
        type="text"
        id="content"
        name="content"
        placeholder="Que voulez-vous partager ?"
        required
        v-model="newPost.content"
      />

      <div class="btn">
        <BaseButton>Publier</BaseButton>
      </div>

    </form>
  </div>
</template>

<style scope lang="scss">
.postForm {
  width: 50%;
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
</style>
