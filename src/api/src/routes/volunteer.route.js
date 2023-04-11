const express = require("express");
const router = express.Router();

const volunteerController = require("../controllers/volunteer.controller");

router.post("/", volunteerController.createVolunteer);
router.get("/", volunteerController.getAllVolunteer);
router.get("/:discordId", volunteerController.getVolunteer);
router.patch("/reset", volunteerController.resetContribution);
router.patch("/:discordId", volunteerController.updateVolunteer);
router.delete("/all", volunteerController.deleteAllVolunteer);
router.delete("/:discordId", volunteerController.deleteVolunteer);

module.exports = router;
