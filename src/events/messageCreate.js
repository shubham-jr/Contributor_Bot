const config = require("./../utils/config");
const isValid = require("./../utils/isValid");

module.exports = {
  name: "messageCreate",
  execute(message, client) {
    if (!isValid.botChannelId(message.channel.id)) return;

    if (message.content.startsWith(config.prefix)) {
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
