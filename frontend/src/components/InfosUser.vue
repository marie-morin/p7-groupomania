<script>
import { mapActions } from 'vuex';
import axios from "axios";
import BaseButton from "@/components/BaseButton";

export default {
  name: "InfosUser",

  components: { BaseButton },

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
    return {
      file: null,
      imagePreview: null,
      progress: 0,
    };
  },

  methods: {
    ...mapActions(['update']),

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

    addPicture() {
      let formData = new FormData();

      formData.append('file', this.file);

      if (formData.get("file") == "null") {
        const contexte = {
          intention: "notification",
          message: "Vous devez selectionner une image !",
        };
        this.$store.commit("displayPopup", contexte);
        return;

      } else {
        console.log(process.env.VUE_APP_LOCALHOST_URL + `users/${this.user.id}/picture`);
        axios.put( 
          process.env.VUE_APP_LOCALHOST_URL + `users/${this.user.id}/picture`,
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

            this.$store.commit("setUser", response.data);
  
            this.file = null,
            this.imagePreview = "";

            this.$refs.inputFile.value = ''

          })
          .catch((error) => {
            console.error(error);
          });
      }
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
        <form @submit.prevent="addPicture">
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

          <!-- <div v-show="showProgressBar">
            <progress-bar :options="progressBarOptions" :value="uploadProgress" />
          </div> -->

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

