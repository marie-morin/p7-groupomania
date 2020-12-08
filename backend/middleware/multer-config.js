const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};

const storage = multer.diskStorage({
  // Creating configuration object for multer
  destination: (req, file, callback) => {
    console.log("pass destination");
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    console.log("pass disktorage filename");
    console.log("file : ", file);
    const name = file.originalname.split(".")[0].split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension); // Creating an name for the image
  },
});

const fileFilter = (req, file, callback) => {
  console.log("pass fileFilter");
  const extension = MIME_TYPES[file.mimetype]; // Fiding the uploaded file's mine type
  if (
    extension === "jpg" ||
    extension === "jpeg" ||
    extension === "png" ||
    extension === "gif"
  ) {
    callback(null, true); // Making sure it is a png or a jpg
  } else {
    callback("Erreur : Mauvais type de fichier", false);
  }
};

module.exports = multer({
  storage, // Adding our multer object
  limits: { fileSize: 104857600 }, // Setting a max file size to be upload to 100 Mo
  fileFilter, // Applying extention filter
}).single("file"); // Making sure the file uploaded by user is a single file, note several
