const express = require('express');
const { signup, signin, signout, socialLogin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const { userSignupValidator } = require('../validator');

const router = express.Router();

router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.get("/signout", signout);
router.post("/social-login", socialLogin);

// Toutes les routes contenant :userId s'éxécuteront d'abord par userByid()

router.param("userId", userById);

module.exports = router;


