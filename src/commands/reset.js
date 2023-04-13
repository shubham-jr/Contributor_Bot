const isValid = require("./../utils/isValid");
const { bold } = require("./../utils/format");
const { resetContribution } = require("./../utils/apiControllers");

module.exports = {
  name: "reset",
  description: "reset!",
  roles: ["admin"],
  async execute(message, args) {
    if (isValid.roles(message, this.roles)) {
      const reply = await resetContribution();
      message.reply(reply);
    } else
      message.reply(`Sorry, only ${bold(this.roles)} can use this command`);
  },
};
