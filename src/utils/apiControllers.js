const url = "http://127.0.0.1:4000/api/v1/volunteer";
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
  let response = { error: false };
  return data && data.getVolunteer
    ? ((response.volunteer = data.getVolunteer), response)
    : ((response.error = "not_registered"), response);
};

const getAllContribution = async () => {
  let response = { error: false };
  let volunteerLists = [];
  const { data } = await axios.get(`${url}`);

  data.getAllVolunteer.forEach((volunteer) => {
    volunteerLists.push({
      discordId: volunteer.discordId,
      contribution: volunteer.contribution,
    });
  });

  return !data.getAllVolunteer.lenght
    ? ((response.error = "no one here"), response)
    : ((response.volunteerLists = volunteerLists), response);
};

const resetContribution = async () => {
  const { data } = await axios.patch(`${url}/reset`);
  return data.message;
};

module.exports = {
  loginController,
  updateContribution,
  getContribution,
  getAllContribution,
  resetContribution,
};
