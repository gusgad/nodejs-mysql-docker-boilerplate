/* PACKAGES */
const express = require("express");
const router = express.Router();

/* CUSTOM */
const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');
const validationSchemas = require('../middleware/validation-schemas');



router.post("/signup", validationSchemas.user.signup, UserController.user_signup);

router.post("/login", validationSchemas.user.login, UserController.user_login);

router.delete("/:userId", checkAuth, validationSchemas.user.signup, UserController.user_delete);

module.exports = router;
