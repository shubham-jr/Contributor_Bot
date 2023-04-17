const isThreadChannel = (message) => {
  return message.channel.parent && message.channel.parent.type === 15;
};

const isBot = (message) => {
  return message.author.bot;
};

module.exports = { isThreadChannel, isBot };
