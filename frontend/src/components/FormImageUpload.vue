<script>
export default {
  name: "FormImageUpload",

  props: {
    wasPosted: {
      type: Boolean,
      required: true,
    },
    inputfile: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      imagePreview: null,
      file: null,
      isFocused: false, 
    };
  },

  watch: {
    wasPosted() {
      this.imagePreview = null;
      document.getElementById(this.inputfile).value = "";
    },
  },

  methods: {

    selectFile(event) {      
      if (event.target.files.length < 1) { return }
      
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
      ];

      this.file = event.target.files[0] || event.dataTransfer.files;

      if (
        !event.target ||
        !allowedTypes.includes(this.file.type) ||
        this.file.size > 104857600
      ) {
        const contexte = {
          intention: "alert",
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

    emitFile(file) { this.$emit("send-imagefile", file) },
  },
};
</script>


<template>
  <div class="imageSelection">
    <label :for="inputfile" class="imageSelection__label" :class="{ focused : isFocused }">
      Choisez un fichier
    </label>

    <input
      :id="inputfile"
      :ref="inputfile"
      type="file"
      accept="image/png, image/jpg, image/jpeg, image/gif"
      @change="selectFile($event)"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />

    <div v-show="imagePreview" class="imageSelection__preview">
      <img :src="imagePreview" />
    </div>
  </div>
</template>


<style scope lang="scss">
.imageSelection {

  &__label {
    width: 24rem;
    display: block;
    margin: $centered-margin;
    padding: $base-padding;
    
    background-color: $success-color;
    color: $clear-color;
    
    border: none;
    border-radius: $small-radius;
    
    text-align: center;
    text-transform: uppercase;
        
    cursor: pointer;
    transition: all .2s;

    &:hover {
      transform: translateY(-0.3rem);
    }

    &:active {
      transform: translateY(-0.1rem);
      box-shadow: $shadow;
    }
  }

  &__preview {
    max-height: 50rem;
    @include flexbox(center, row, center);
    background-color: $secondary-color;
    text-align: center;
    margin: 1rem auto;

    img {
      max-width: 100%;
      max-height: 50rem;
      object-fit: cover;
    }
  }
}

[type="file"] {
  width: 0.1rem;
  height: 0.1rem;
  position: absolute !important;
  padding: 0;
  border: 0;
  clip: rect(0, 0, 0, 0);
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
}

.focused {
  outline: solid blue;
}
</style>
