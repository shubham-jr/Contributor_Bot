const isThreadChannel = (message) => {
  return message.channel.parent && message.channel.parent.type;
};

module.exports = { isThreadChannel };
