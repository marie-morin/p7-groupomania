// Import
const models = require("../models");
const utils = require("../utils/jwtUtils");
const verifInput = require("../utils/verifInput");

// Security imports
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailValidator = require("email-validator");
const passwordValidator = require("password-validator");

// Signup
exports.signup = (req, res, next) => {};

// Login
exports.login = (req, res, next) => {};

// Get all users
exports.getAllUsers = (req, res, next) => {};

// Get One user
exports.getOneUser = (req, res) => {};

// Get one user by its username
exports.getUserByUsername = (req, res, next) => {};

// Update user acount
exports.modifyUser = (req, res, next) => {};

// // Delete an acount
exports.deleteUser = (req, res, next) => {};
