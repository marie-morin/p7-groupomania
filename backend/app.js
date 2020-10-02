// Imports
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
// Security Imports
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
// Routes Imports
const userRoutes = require("./routes/userRoutes");
// const postRoutes = require("./routes/postRoutes");
// const commentRoutes = require("./routes/commentRoutes");

// Express app launching
const app = express();

// Helmet middlware for safe headers
app.use(helmet());

// express-rate-limit middleware to limit the amount of request done
const limiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Setting CORS headers
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

// Parsing req
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Security
app.use(hpp()); // HPP middleware to protect against HTTP parameter pollution attacks

// Setting routes
app.use("/api/users", userRoutes);
// app.use("/api/posts", postRoutes);
// app.use("/api/comments", commentRoutes);

// Exporting module
module.exports = app;
