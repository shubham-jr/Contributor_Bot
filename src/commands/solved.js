const isValid = require("./../utils/isValid");
const { bold } = require("./../utils/format");
const { isThreadChannel } = require("./../utils/discordHelper");

async function getThreadDetails(message) {
  const threadMessages = await message.channel.messages.fetch({
    after: 1,
    limit: 1,
  });

  const firstMessage = threadMessages.first();
  return {
    name: firstMessage.author.username,
    id: firstMessage.author.id,
  };
}

module.exports = {
  name: "solved",
  description: "solved!",
  roles: [],
  async execute(message, args) {
    if (isValid.roles(message, this.roles)) {
      const threadOP = await getThreadDetails(message);

      if (message.author.id !== threadOP.id || !isThreadChannel(message))
        return;

      const threadChannel = await message.client.channels.fetch(
        message.channel.id
      );

      const set = !threadChannel.locked;

      await threadChannel.setLocked(set);

      // await threadChannel.setName("<SOLVED>");
    } else message.reply(`Sorry, only ${bold(this.roles)} can register`);
  },
};
