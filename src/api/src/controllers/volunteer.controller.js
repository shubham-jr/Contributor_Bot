const httpStatus = require("http-status");
const validateSchema = require("../middlewares/validate.js");
const ApiError = require("./../utils/ApiError");
require("express-async-errors");

const volunteerValidation = require("../validations/volunteer.validation");

const volunteerService = require("../services/volunteer.service");

const createVolunteer = async (req, res, next) => {
  validateSchema(req, volunteerValidation.createVolunteer);

  const { discordId, history, contribution } = req.body;

  const createdVolunteer = await volunteerService.createVolunteer({
    discordId,
    history,
    contribution,
  });

  res.status(httpStatus.CREATED).send({
    createdVolunteer,
    status: "success",
    message: "registered successfully",
  });
};

const getAllVolunteer = async (req, res, next) => {
  const getAllVolunteer = await volunteerService.getAllVolunteer();

  res
    .status(httpStatus.CREATED)
    .send({ totalVolunteer: getAllVolunteer.length, getAllVolunteer });
};

const getVolunteer = async (req, res, next) => {
  const discordId = req.params.discordId;

  const getVolunteer = await volunteerService.getVolunteer({ discordId });

  res.status(httpStatus.CREATED).send({ getVolunteer });
};

const updateVolunteer = async (req, res, next) => {
  const discordId = req.params.discordId;
  // validateSchema(req, volunteerValidation.updateVolunteer);

  const updatedVolunteer = await volunteerService.updateVolunteer({
    discordId,
    body: req.body,
  });

  res.status(httpStatus.CREATED).send({ updatedVolunteer });
};

const deleteVolunteer = async (req, res, next) => {
  const discordId = req.params.discordId;

  await volunteerService.deleteVolunteer({ discordId });

  res.status(httpStatus.CREATED).send({});
};

const deleteAllVolunteer = async (req, res, next) => {
  await volunteerService.deleteAllVolunteer();

  res.status(httpStatus.CREATED).send({});
};

const resetContribution = async (req, res, next) => {
  console.log("wdjcbejbcbcj");
  const resettedVolunteers = await volunteerService.resetContribution();
  res.status(httpStatus.CREATED).send({ resettedVolunteers });
};

module.exports = {
  createVolunteer,
  getAllVolunteer,
  updateVolunteer,
  getVolunteer,
  deleteVolunteer,
  deleteAllVolunteer,
  resetContribution,
};
