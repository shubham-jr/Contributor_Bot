const { ObjectId } = require("mongoose").Types;
require("express-async-errors");
const volunteerModel = require("./../models/volunteer.model");

const createVolunteer = async ({
  discordId,
  history,
  contribution,
  contributionHistory,
}) => {
  console.log(discordId, history, contribution, contributionHistory);
  const createdVolunteer = await volunteerModel.create({
    discordId,
    history,
    contribution,
    contributionHistory,
  });

  return createdVolunteer;
};

const getAllVolunteer = async () => {
  // const getAllVolunteer = await volunteerModel.find();
  const getAllVolunteer = await volunteerModel
    .find()
    .sort({ contribution: -1 });

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

// const resetContribution = async () => {
//   const updatedVolunteers = await volunteerModel.updateMany({
//     contribution: 0,
//   });
//   return updatedVolunteers;
// };

const resetContribution = async () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const updatedVolunteers = await volunteerModel.find();
  for (const volunteer of updatedVolunteers) {
    const { contribution } = volunteer;

    const updateContributionHistory = {
      contribution,
      year: currentYear,
      month: currentMonth,
    };
    console.log(volunteer);
    volunteer.contribution = 0;
    volunteer.contributionHistory.push(updateContributionHistory);
    await volunteer.save({ runValidators: false });
  }
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
