module.exports = {
  name: "status",
  description: "status!",
  roles: ["admin"],
  async execute(message, args) {
    const status = message.content.split(" ")[2];
    try {
      message.client.user.setPresence({
        status: "only",
        activity: {
          name: status,
          type: "PLAYING",
        },
      });
      console.log("yeah", status);
      message.client.guilds.cache.clear();
    } catch (error) {
      console.error(error);
    }
  },
};
