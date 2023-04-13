const config = require("./config.js");

const channel = (threadParent) => {
  // Get the server by its ID
  // const server = client.guilds.cache.get(reaction.message.guild.id);

  // // Get all the channels in the server
  // const channels = server.channels.cache;

  // // Loop through the channels and log their IDs
  // channels.forEach((channel) => {
  //   console.log(channel);
  //   if (channel.isThread()) {
  //   }
  // });

  // if you want to check if the thread associated with channel or it's
  // a normal thread then see it's type if not 0 then it's forum otherwise
  // if it doesn't have parent then type === 0

  if (
    config.skipForumChannelIds.includes(threadParent.id) ||
    Number(threadParent.type) === 0
  )
    return false;
  return true;
};

const emoji = (emojiName) => {
  return config.validEmojis.includes(emojiName);
};

const roles = (message, validRoles) => {
  const roles = message.member.roles.cache.map((role) =>
    role.name.toLowerCase()
  );
  console.log(roles, validRoles);
  return validRoles.every((role) => roles.includes(role.toLowerCase()));
};

const botChannelId = (id) => {
  console.log(config.botChannelId, id);
  return config.botChannelId === id;
};

const reaction = (user, message) => {
  return user.id !== message.author.id;
};
module.exports = {
  channel,
  emoji,
  roles,
  botChannelId,
  reaction,
};
