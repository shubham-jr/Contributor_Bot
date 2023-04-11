const discordId = (value, helpers) => {
  const discordIdRegEx = /^[0-9]{18}$/;
  if (!value.match(discordIdRegEx)) {
    return helpers.message("{{#label}} number must be a valid discord Id");
  }
  return value;
};

module.exports = { discordId };
