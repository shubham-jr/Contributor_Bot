const url = "http://127.0.0.1:4444/api/v1/volunteer";
const axios = require("axios");

const loginController = async (discordId) => {
  const { data } = await axios.post(url, {
    discordId,
  });

  return data.message;
};

const updateContribution = async (messageReactionInfo) => {
  const discordId = messageReactionInfo.OPOfReactedMessage.id;
  const contribution = messageReactionInfo.emoji.value;
  await axios.patch(`${url}/${discordId}`, {
    history: [{ messageReactionInfo }],
    contribution,
  });
};

const getContribution = async (discordId) => {
  const { data } = await axios.get(`${url}/${discordId}`);
  return data && data.getVolunteer && data.getVolunteer
    ? data.getVolunteer.contribution
    : "not_registered";
};

const getAllContribution = async () => {
  let volunteerLists = [];
  const { data } = await axios.get(`${url}`);
  if (!data.getAllVolunteer.length) return "No one here"; // include error obj such that we can find that it's error

  data.getAllVolunteer.forEach((volunteer) => {
    volunteerLists.push({
      discordId: volunteer.discordId,
      contribution: volunteer.contribution,
    });
  });
  return volunteerLists;
};

module.exports = {
  loginController,
  updateContribution,
  getContribution,
  getAllContribution,
};
