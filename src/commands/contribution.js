const { bold, newLine, seperator } = require("./../utils/format");
const catchAsync = require("./../utils/catchAsync");
const DiscordError = require("./../utils/DiscordError");
const embdedProps = require("./../utils/embdedProps");

const {
  getAllContribution,
  getContribution,
} = require("./../utils/apiControllers");

const getAllVolunteer = async (volunteerLists, message) => {
  // for (let i = 0; i < volunteerLists.length; i++) {
  //   let singleVolunteer = {};
  //   const { username } = await message.client.users.fetch(
  //     volunteerLists[i].discordId
  //   );
  //   singleVolunteer.username = username;
  //   singleVolunteer.contribution = volunteerLists[i].contribution;
  //   allVolunteer.push(singleVolunteer);
  // }

  // one liner code for upper one
  const allVolunteer = await Promise.all(
    volunteerLists.map(async (volunteer) => ({
      username: (
        await message.client.users.fetch(volunteer.discordId)
      ).username,
      contribution: volunteer.contribution,
    }))
  );
  return allVolunteer;
};

const getSubDescription = (allVolunteer) => {
  let subDescription = "";
  allVolunteer.forEach(({ username, contribution }) => {
    subDescription += `${bold(username)}  ${seperator()} ${bold(
      contribution
    )} ${newLine()}`;
  });
  return subDescription;
};

const allContribution = catchAsync(async (message) => {
  const volunteerLists = await getAllContribution();

  if (volunteerLists === "No one here")
    throw new DiscordError("No one here", message);

  const allVolunteer = await getAllVolunteer(volunteerLists, message);

  const props = embdedProps({
    title: "List of Contributors",
    description: getSubDescription(allVolunteer),
  });

  return props;
});

async function myContribution(message) {
  const contribution = await getContribution(message.author.id);

  if (contribution === "not_registered")
    throw new DiscordError("You are not registered", message);

  const username = message.author.username;

  const props = embdedProps({
    title: `${username}'s Contribution`,
    description: `Your Contribution points are ${bold(contribution)}`,
  });
  return props;
}

module.exports = {
  name: "contribution",
  description: "Contribution!",
  roles: [],
  async execute(message, args) {
    const subCommand = message.content.split(" ")[2];
    let reply;
    if (subCommand == "my") reply = await myContribution(message);
    if (subCommand == "all") reply = await allContribution(message);
    if (reply) message.reply({ embeds: [reply] });
  },
};
