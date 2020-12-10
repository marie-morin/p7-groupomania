<script>
export default {
  name: "FormImageUpload",

  data() {
    return {
      imagePreview: null,
      file: null,
    };
  },

  methods: {
    selectFile(event) {
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
      ];
      this.file = event.target.files[0] || event.dataTransfer.files;

      // if(!allowedTypes.includes(this.file.type) || this.file.size > 1000000) {
      if (!allowedTypes.includes(this.file.type)) {
        const contexte = {
          intention: "notification",
          message:
            "Vous devez selectionner des images (.jpeg, .jpg ou .png) ou des gif (.gif) de moins de 1 Mo !",
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
