const { createEmbeddedError } = require("./../utils/embded");

const errorHandler = (error) => {
  console.log("bhola", error);
  const message = error.dcMsgObj;

  if (error.type === "discordError") {
    // Handle DiscordError instance
    message.reply({ embeds: [createEmbeddedError(error.message)] });
  } else {
    // const { message, statusCode } = productionError(error);
    // message.channel.send(message);
  }
};

module.exports = { errorHandler };
