const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const helmet = require("helmet");
// const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app = express();

app.use(helmet());
app.use(cors());

// express-rate-limit middleware to limit the amount of request done
// const limiter = rateLimit({
//   windowMs: 30 * 60 * 1000,
//   max: 100,
// });
// app.use(limiter);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, Content-Type, Access-Control-Allow-Headers"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(hpp());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/images-test", express.static(path.join(__dirname, "images-test")));

module.exports = app;
