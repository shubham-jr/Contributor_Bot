const { bold, newLine, seperator } = require("./../utils/format");
const catchAsync = require("./../utils/catchAsync");
const DiscordError = require("./../utils/DiscordError");
const embdedProps = require("./../utils/embdedProps");

const {
  getAllContribution,
  getContribution,
} = require("./../utils/apiControllers");

const getAllVolunteer = catchAsync(async (volunteerLists, message) => {
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
});

const getSubDescription = (allVolunteer) => {
  let subDescription = "";
  allVolunteer.forEach(({ username, contribution }, id) => {
    subDescription += `${id + 1} .  ${bold(username)}  ${seperator()} ${bold(
      contribution
    )} ${newLine()}`;
  });
  return subDescription;
};

const allContribution = catchAsync(async (message) => {
  const response = await getAllContribution();
  console.log("respone", response.error);

  if (response.error) throw new DiscordError(response.error, message);

  const allVolunteer = await getAllVolunteer(response.volunteerLists, message);

  const props = embdedProps({
    title: "List of Contributors",
    description: getSubDescription(allVolunteer),
  });

  return props;
});

const myContribution = catchAsync(async (message) => {
  const response = await getContribution(message.author.id);
  console.log(response);

  if (response.error) throw new DiscordError(response.error, message);

  const username = message.author.username;
  const { contribution } = response.volunteer;

  const props = embdedProps({
    title: `${username}'s Contribution`,
    description: `Your Contribution points of this month = ${bold(
      contribution
    )}`,
  });
  return props;
});

const plotContribution = catchAsync(async (message) => {
  const { ChartJSNodeCanvas } = require("chartjs-node-canvas");

  const response = await getContribution(message.author.id);
  if (response.error) throw new DiscordError(response.error, message);

  const { contributionHistory } = response.volunteer;
  console.log(response);
  // do above in one line

  // Extract the contribution and date data from the contribution history
  const contributions = [];
  const dates = [];
  console.log(contributionHistory);
  for (const { contribution, year, month } of contributionHistory) {
    contributions.push(contribution);
    dates.push(`${year}-${month.toString().padStart(2, "0")}`);
  }

  console.log(dates, contributions);

  // Define the contribution data
  const contributionData = {
    labels: dates,
    datasets: [
      {
        label: "Contribution",
        data: contributions,
        backgroundColor: "#36A2EB",
        borderColor: "#36A2EB",
        borderWidth: 5,
      },
    ],
  };

  // Define the chart configuration
  const chartConfig = {
    type: "line",
    data: contributionData,
    options: {
      scales: {
        x: {
          gridLines: {
            color: "#36A2EB", // set color of x-axis grid lines
          },
          ticks: {
            color: "white", // change x-axis tick color to red
            font: {
              size: 16, // increase x-axis tick font size
              weight: "bold", // make x-axis tick font bold
            },
          },
        },
        y: {
          ticks: {
            color: "white", // change y-axis tick color to blue
            font: {
              size: 16, // increase y-axis tick font size
              weight: "bold", // make y-axis tick font bold
            },
          },
        },
      },
      legend: {
        labels: {
          fontSize: 16,
          fontWeight: "bold",
        },
      },
    },
  };

  // Create the chart using Chart.js
  const chartJSNodeCanvas = new ChartJSNodeCanvas({ width: 500, height: 400 });
  const image = await chartJSNodeCanvas.renderToBuffer(
    chartConfig,
    "image/png"
  );

  // Send the chart image to Discord
  message.reply({
    files: [
      {
        attachment: image,
        name: "chart.png",
      },
    ],
  });
});

module.exports = {
  name: "contribution",
  description: "Contribution!",
  roles: [],
  async execute(message, args) {
    const subCommand = message.content.split(" ")[2];
    let reply;
    if (subCommand == "my") reply = await myContribution(message);
    if (subCommand == "all") reply = await allContribution(message);
    if (subCommand == "plot") await plotContribution(message);
    if (reply) message.reply({ embeds: [reply] });
  },
};
