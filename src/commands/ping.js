module.exports = {
  name: "ping",
  description: "Ping!",
  roles: [],
  execute(message, args) {
    message.reply("Pong!");
  },
};
