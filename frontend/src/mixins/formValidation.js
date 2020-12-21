const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%?]{6,}$/;
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regex = /^[a-zA-Z0-9\s-_.,!?()"]+$/;

export default {
  methods: {
    emailValidation(input) {
      if (!emailRegex.test(input)) {
        const contexte = {
          intention: "alert",
          message: `Vous devez rensignez une adresse email valide`,
        };
        this.$store.commit("displayPopup", contexte);
        return false;
      } else {
        return true;
      }
    },

    passwordValidation(input) {
      if (!passwordRegex.test(input)) {
        const contexte = {
          intention: "alert",
          message: `Le mot de passe doit comporter au moins 8 caractères, une majuscule, une minuscule, une lettre et un chiffre. Seuls les caractères spéciaux suivants sont autorisée : @ $ ! % ?`,
        };
        this.$store.commit("displayPopup", contexte);
        return false;
      } else {
        return true;
      }
    },

    contentValidation(input) {
      if (!regex.test(input)) {
        const contexte = {
          intention: "alert",
          message: `Le mot de passe doit comporter au moins 8 caractères, une majuscule, une minuscule, une lettre et un chiffre. Seuls les caractères spéciaux suivants sont autorisée : @ $ ! % ?`,
        };
        this.$store.commit("displayPopup", contexte);
        return false;
      } else {
        return true;
      }
    },

    passwordConfirmation(mdp, conf) {
      if (mdp != conf) {
        const contexte = {
          intention: "alert",
          message:
            "La confirmation du mot de passe doit être identique au mot de passe !",
        };
        this.$store.commit("displayPopup", contexte);

        return false;
      } else {
        return true;
      }
    },
  },
};
