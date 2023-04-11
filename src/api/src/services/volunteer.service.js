const { ObjectId } = require("mongoose").Types;
require("express-async-errors");
const volunteerModel = require("./../models/volunteer.model");

const createVolunteer = async ({ discordId, history, contribution }) => {
  const createdVolunteer = await volunteerModel.create({
    discordId,
    history,
    contribution,
  });

  console.log(createVolunteer);

  return createdVolunteer;
};

const getAllVolunteer = async () => {
  const getAllVolunteer = await volunteerModel.find();

  return getAllVolunteer;
};

const getVolunteer = async ({ discordId }) => {
  const getAllVolunteer = await volunteerModel.findOne({ discordId });

  return getAllVolunteer;
};

const updateVolunteer = async ({ discordId, body }) => {
  console.log("discoedId", discordId, typeof discordId);
  const oldVolunteer = await volunteerModel.findOne({ discordId });
  console.log("old", oldVolunteer);
  oldVolunteer.history.push(body.history[0]);
  oldVolunteer.contribution += body.contribution;
  const updatedVolunteer = await oldVolunteer.save();
  console.log(updateVolunteer);
  return updatedVolunteer;
};

const deleteVolunteer = async ({ discordId }) => {
  await volunteerModel.deleteOne({ discordId });
};

const deleteAllVolunteer = async () => {
  await volunteerModel.deleteMany({});
};

const resetContribution = async () => {
  console.log("yes");
  const updatedVolunteers = await volunteerModel.updateMany({
    contribution: 0,
  });
  return updatedVolunteers;
};

module.exports = {
  createVolunteer,
  getAllVolunteer,
  getVolunteer,
  updateVolunteer,
  deleteVolunteer,
  deleteAllVolunteer,
  resetContribution,
};
