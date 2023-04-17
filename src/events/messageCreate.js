const config = require("./../utils/config");
const isValid = require("./../utils/isValid");
const { isThreadChannel, isBot } = require("./../utils/discordHelper");
const customEmojiId = require("./../utils/emojiIds");

function reactOnMessage(message) {
  // React to the message with a custom emoji
  customEmojiId.forEach((emojiId) => {
    const customEmoji = message.client.emojis.cache.get(emojiId);
    if (customEmoji) {
      message
        .react(customEmoji)
        .then(() => console.log(`Reacted with custom emoji ${customEmoji}`))
        .catch(console.error);
    } else {
      console.error(`Could not find custom emoji with ID ${customEmojiId}`);
    }
  });
}

module.exports = {
  name: "messageCreate",
  execute(message, client) {
    // command coming from bot_channel or from forum thread
    if (!isValid.botChannelId(message.channel.id) && !isThreadChannel(message))
      return;

    const isValidPrefix = message.content.startsWith(config.prefix);
    if (isThreadChannel(message) && !isValidPrefix && !isBot(message))
      reactOnMessage(message);

    if (isValidPrefix) {
      const args = message.content
        .slice(config.prefix.length)
        .trim()
        .split(/ +/);
      const command = args.shift().toLowerCase();

      if (!client.commands.has(command)) return;

      try {
        client.commands.get(command).execute(message, args);
      } catch (error) {
        console.error(error);
        message.reply("there is an error while executing the command command!");
      }
    }
  },
};
