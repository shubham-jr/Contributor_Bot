const isValid = require("./../utils/isValid");
const { bold } = require("./../utils/format");
const { loginController } = require("./../utils/apiControllers");

module.exports = {
  name: "register",
  description: "register!",
  roles: ["Volunteer"],
  async execute(message, args) {
    console.log();
    if (isValid.roles(message, this.roles)) {
      const reply = await loginController(message.author.id);
      message.reply(reply);
    } else message.reply(`Sorry, only ${bold(this.roles)} can register`);
  },
};
