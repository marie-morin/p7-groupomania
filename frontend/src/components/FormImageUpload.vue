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
  <div class="upload">
    <input
      type="file"
      id="file-input"
      ref="inputFile"
      accept="image/png, image/jpg, image/jpeg, image/gif"
      @change="selectFile($event)"
    />

    <section v-show="imagePreview">
      <img :src="imagePreview" class="image" />
    </section>
  </div>
</template>

<style scope lang="scss"></style>
