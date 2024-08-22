const express = require('express');
const router = express.Router();
const {
    signupController,
    loginController,
    authController
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");


//routes
//signup route
router.post('/signup', signupController);

//login route
router.post('/login', loginController);

//Auth || POST
router.post("/getUserData", authMiddleware, authController);

module.exports = router;
