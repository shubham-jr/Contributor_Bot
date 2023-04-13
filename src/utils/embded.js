const { EmbedBuilder } = require("discord.js");

// create a new embed
const createEmbeddedMessage = (props) => {
  console.log(props.color);
  const exampleEmbed = new EmbedBuilder()
    .setColor(`#FF0000`)
    .setTitle(`${props.title}`)
    .setDescription(`${props.description}`);
  // .addFields({
  //   name: `neymar`,
  //   value: `jr`,
  //   inline: true,
  // });
  return exampleEmbed;
};

// create a new embed
const createEmbeddedError = (error) => {
  const exampleEmbed = new EmbedBuilder()
    .setColor(`#FF0000`)
    .setTitle(`${error}`);
  // .setDescription(`${props.description}`);
  // .addFields({
  //   name: `neymar`,
  //   value: `jr`,
  //   inline: true,
  // });
  return exampleEmbed;
};

const singleMessageEmbedded = (props) => {
  const exampleEmbed = new EmbedBuilder()
    .setColor(`#FF0000`)
    .setTitle(`${props.title}`);
  // .setDescription(`${props.description}`);
  // .addFields({
  //   name: `neymar`,
  //   value: `jr`,
  //   inline: true,
  // });
  return exampleEmbed;
};

// send the embed to a channel
module.exports = {
  createEmbeddedMessage,
  createEmbeddedError,
  singleMessageEmbedded,
};
