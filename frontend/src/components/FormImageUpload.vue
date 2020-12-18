<script>
export default {
  name: "FormImageUpload",

  props: {
    wasPosted: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      imagePreview: null,
      file: null,
    };
  },

  watch: {
    wasPosted() {
      console.log(this.wasPosted);
      this.imagePreview = null;
      this.$refs.inputFile.value = "";
    },
  },

  methods: {
    selectFile(event) {      
      if (event.target.files.length < 1) {
        console.log("passss");
        return;
      }
      
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
      ];
      this.file = event.target.files[0] || event.dataTransfer.files;
      // console.log("file : ", this.file);
      // console.log("size : ", this.file.size);

      if (
        !event.target ||
        !allowedTypes.includes(this.file.type) ||
        this.file.size > 104857600
      ) {
        const contexte = {
          intention: "notification",
          message:
            "Vous devez selectionner une image (.jpeg, .jpg ou .png) ou un gif (.gif) de moins de 100 Mo !",
        };
        this.$store.commit("displayPopup", contexte);
        this.file = null;
        return;
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result;
        };
        reader.readAsDataURL(event.target.files[0]);
      }
      this.emitFile(this.file);
    },

    emitFile(file) {
      this.$emit("send-imagefile", file);
    },
  },
};
</script>

<template>
  <div class="imageSelection">
    <!-- <label for="file-input">Image</label> -->
    <div class="imageSelection__button">

      <label for="file-input" class="imageSelection__label">
        Choisez une image ou un gif
      </label>

      <input
        type="file"
        id="file-input"
        ref="inputFile"
        accept="image/png, image/jpg, image/jpeg, image/gif"
        @change="selectFile($event)"
        class="testou"
      />
    </div>
    <div v-show="imagePreview" class="imageSelection__preview">
      <img  :src="imagePreview" />
    </div>

  </div>
</template>

<style scope lang="scss">
.imageSelection {
  

  // &__button {
  //   // width: 70%;
    
  // }

  &__icon {
    font-size: 1.3rem;
    color: $success-color;
  }

  &__label {
    width: 50%;
    // @include flexbox(center, row, center);
    cursor: pointer;
    display: block;
    padding: 15px 40px;
    margin: 0 auto;
    
    color: $clear-color;
    background-color: $success-color;
    
    border-radius: $medium-radius;
    border: none;
    
    text-align: center;
    text-transform: uppercase;
    
    // cursor: pointer;
    
    transition: all .2s;

    &:hover {
      transform: translateY(-3px);
    }

    &:active {
        transform: translateY(-1px);
        box-shadow: $shadow;
    }
  }

  &__preview {
    height: 500px;
    background-color: $secondary-color;

    img {
      display: block;
      margin: 0 auto;
      max-width: 100%;
      height: 100%;
    }
  }
}

[type="file"] {
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  overflow: hidden;
  padding: 0;
  position: absolute !important;
  white-space: nowrap;
  width: 1px;
  cursor: pointer;
}
</style>
