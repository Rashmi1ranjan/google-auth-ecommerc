
const express = require("express");


const { register, login, logout,googleAuth,googleAuthCallback } = require("../controllers/authControllers");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/auth/google",googleAuth);
router.get("/auth/google/callback",googleAuthCallback);

module.exports=router;


