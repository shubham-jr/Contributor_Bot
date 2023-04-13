const { createEmbeddedError } = require("./../utils/embded");

const errorHandler = (error) => {
  const message = error.dcMsgObj;
  console.log(error.type);

  if (error.type === "discordError" || error.type === "DiscordError") {
    // Handle DiscordError instance
    message.reply({ embeds: [createEmbeddedError(error.message)] });
  } else {
    // const { message, statusCode } = productionError(error);
    // message.channel.send(message);
  }
};

module.exports = { errorHandler };
