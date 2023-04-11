const Joi = require("joi");
const { discordId } = require("./custom.validation");

const createVolunteer = {
  body: Joi.object({
    discordId: Joi.string().trim().required(),
    history: Joi.array().items(Joi.object()),
    contribution: Joi.number(),
  }),
};

const updateVolunteer = {
  history: Joi.array().items(Joi.object()),
  contribution: Joi.number(),
};

module.exports = { createVolunteer, updateVolunteer };
