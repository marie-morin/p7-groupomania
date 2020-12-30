const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};

const storage = multer.diskStorage({
  // Determiner la destination du fichier
  destination: (req, file, callback) => {
    callback(null, "images");
  },

  // Determiner le nouveau nom du fichier
  filename: (req, file, callback) => {
    const name = file.originalname.split(".")[0].split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, "client_" + name + Date.now() + "." + extension);
  },
});

// Vérifier la compatibilité de l'extention du fichier
const fileFilter = (req, file, callback) => {
  const extension = MIME_TYPES[file.mimetype];
  if (
    extension === "jpg" ||
    extension === "jpeg" ||
    extension === "png" ||
    extension === "gif"
  ) {
    callback(null, true);
  } else {
    callback("Erreur : Mauvais type de fichier", false);
  }
};

module.exports = multer({
  storage,
  limits: { fileSize: 104857600 },
  fileFilter,
}).single("file");
