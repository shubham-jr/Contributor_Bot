const isValid = require("./../utils/isValid");
const { bold } = require("./../utils/format");
const { loginController } = require("./../utils/apiControllers");
const embdedProps = require("./../utils/embdedProps");

module.exports = {
  name: "register",
  description: "register!",
  roles: ["Volunteer"],
  async execute(message, args) {
    console.log("in register");
    if (isValid.roles(message, this.roles)) {
      console.log("in register");
      const reply = await loginController(message.author.id);
      message.reply({
        embeds: [embdedProps({ title: reply })],
      });
    } else
      message.reply({
        embeds: [
          embdedProps({
            title: `Sorry, only ${bold(this.roles)} can register`,
          }),
        ],
      });
  },
};
