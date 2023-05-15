const express = require("express");
const router = express.Router();
const postRoutes = require("./posts");

// define http request
router.use("/posts", postRoutes);

module.exports = router;
