const express = require("express");
const router = express.Router();

// File_Appending
const volunteerRoute = require('./../routes/volunteer.route');

// Routes_Appending
router.use('/volunteer', volunteerRoute);

module.exports = router;
