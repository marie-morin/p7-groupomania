<script>
import { mapActions } from 'vuex';
import axios from "axios";
import ProgressBar from "vuejs-progress-bar";
import BaseButton from "@/components/BaseButton";

export default {
  name: "InfosUser",

  components: { ProgressBar, BaseButton },

  props: {
    user: {
      type: Object,
      requiered: true,
    },
    isOwner: {
      type: Boolean,
      requiered: true,
    }
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
      }
    };

    return {
      imageUrl: null,
      file: null,
      imagePreview: null,
      formData: null,
      uploadProgress: 0,
      showProgressBar: false,
      progressBarOptions: progressBarOptions,
    };
  },

  created() {
    console.log("this.user : ", this.user);
  },

  methods: {
    ...mapActions(['update']),

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
            this.imageUrl = response.data.secure_url;
            this.updateProfilPicture();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          setTimeout(
            function() {
              this.showProgressBar = false;
              this.imagePreview = null;
            }.bind(this),
            1000
          );
        });
    },

    updateProfilPicture() {
      if (this.imageUrl == null) {
        const contexte = {
          intention: "notification",
          message: "Vous devez selectionner une image !",
        };
        this.$store.commit("displayPopup", contexte);
        return;
      }
      
      const contexte = {
        origin: "updateProfilPicture",
        intention: "confirmation",
        message: "Voulez-vous vraiment modifier votre compte ?",
        options: {
          url: process.env.VUE_APP_LOCALHOST_URL + `users/${this.user.id}/picture`,
          mutation: "setUser",
          data: this.imageUrl,
        },
      };
      this.$store.commit("displayPopup", contexte);
    },
  }

};
</script>


<template>
  <div class="page-content">
    <div class="infos-container">
      <h1 v-if="isOwner">Bienvenue {{ user.firstname }} !</h1>
      <h1 v-else>{{ user.username }}</h1>

      <section v-if="user.imageUrl">
        <img :src="user.imageUrl" :alt="user.username" class="image">
        <br>
        <button>Modifier la photo de profil</button>
      </section>

      <section v-else>
        <button>Ajouter un photo de profil</button>
      </section>

      <section>
        <form @submit.prevent="upload">
          <input
            type="file"
            id="file-input"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            @change="selectFile($event)"
          />

          <section v-show="imagePreview">
            <img :src="imagePreview" class="image"/>
          </section>

          <div v-show="showProgressBar">
            <progress-bar :options="progressBarOptions" :value="uploadProgress" />
          </div>

          <div class="form-btn">
            <BaseButton>Enregistrer</BaseButton>
          </div>
        </form>
      </section>

      <h3>Nom d'utilisateur :</h3>
      <p>{{ user.firstname }} {{ user.lastname }}</p>

      <h3 v-if="isOwner">Email :</h3>
      <p v-if="isOwner">{{ user.email }}</p>

      <h3>Biographie :</h3>
      <p v-if="user.bio">{{ user.bio }}</p>
      <p v-else>Vous n'avez pas encore ajouté de biographie à votre profil !</p>

      <h3 v-if="user.isAdmin">Administration :</h3>
      <p v-if="user.isAdmin">Vous êtes administrateur.</p>
    </div>
  </div>
</template>


<style scope lang="scss">
.image {
  max-width: 200px;
  max-height: 200px;
}
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

