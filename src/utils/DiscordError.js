class DiscordError extends Error {
  constructor(message, dcMsgObj) {
    super(message);
    this.type = "discordError";
    this.dcMsgObj = dcMsgObj;
    // Error.captureStackTrace(this, this.constructor);
    console.log("disc class", this);
  }
}

module.exports = DiscordError;
