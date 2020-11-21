<template>
  <div class="form-section">
    <div class="form-container">
      <form @submit.prevent="checkForm" class="form">

        <div class="form-row" v-for="(item, name) in schema" :key="name">
          <label :for="name">{{ item.label }}</label>
          <input
            :type="item.type"
            :name="name"
            :id="name"
            v-model="user[name]"
            v-if="item.elt === 'input'"
            :required="user[name] !== 'bio' ? true : false"
          />
          <textarea
            :name="name"
            :id="name"
            cols="10"
            rows="10"
            v-model="user[name]"
            v-if="item.elt === 'textarea'"
          ></textarea>
        </div>

        <div class="form-btn">
          <input type="submit" class="form-submit" :value="settings.title" />
        </div>

        <div class="form-btn">
          <input
            type="submit"
            class="form-submit"
            value="Annuler"
            @click.prevent.stop="$emit('display-form')"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProfilForm",
  props: {
    settings: {
      type: Object,
      required: true,
    },
    schema: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
    },
  },

  // data: function() {
  //   // const obj = {};
  //   // for (const [key] of Object.entries(this.schema)) {
  //   //   obj[key] = "";
  //   // }
  //   // return { test: { ...obj } };
  // },

  methods: {
    checkForm: function() {
      // const user = {};
      console.log(this.user);
      // for (const [key, value] of Object.entries(this.test)) {
      //   this.user[key] = value;
      // }
      let TOKEN = localStorage.getItem("jwt");
      const headers = {
        Authorization: "Bearer " + TOKEN.replace(/['"']+/g, ""),
      };

      axios.put(
        this.settings.urlPost + this.settings.userId,
        { data: JSON.stringify(this.user) },
        { headers: headers }
      );

      this.$router.go();
    },
  },
};
</script>

<style scoped lang="scss">
.form {
  width: 100%;
  margin: 0 auto;
  background-color: $groupomania-back-grey;
  border-radius: 5px;

  &-container {
    width: 40%;
    margin: 0 auto;
    padding: 40px;
    background-color: $groupomania-back-grey;
    border-radius: $radius;
    border: 3px solid $groupomania-red;

    @media screen and(max-width: $large + 100) {
      width: 70%;
    }
    @media screen and(max-width: $small) {
      width: 90%;
      padding: 40px 10px;
    }
  }

  &-row {
    margin: 10px 0;
    text-align: left;
  }

  &-btn {
    width: 40%;
    margin: 0 auto;
  }
  &-submit {
    display: block;
    border-radius: $radius;
    background-color: $groupomania-red;
    color: $groupomania-police;
    font-weight: bold;
    text-transform: uppercase;

    &:hover {
      background-color: darken($color: $groupomania-red, $amount: 5);
    }
  }

  input {
    width: 100%;
    height: 40px;
    margin: 5px 0;
    padding: 0 5px;
    border: none;
    border-radius: $radius;
  }
  textarea {
    width: 100%;
    margin: 5px 0 20px 0;
    border: none;
    border-radius: $radius;
    min-height: 40px;
  }

  label {
    color: $groupomania-font-blue;
  }
}

.option {
  color: $groupomania-red;
  text-transform: none;
}

h1 {
  margin: 0;
  color: $groupomania-font-blue;
}
</style>
