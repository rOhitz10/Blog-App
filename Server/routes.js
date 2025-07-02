const express = require('express');
const { createBlog } = require('./controller.js');
const router = express.Router();

router.post("/create",createBlog)

module.exports = router; 