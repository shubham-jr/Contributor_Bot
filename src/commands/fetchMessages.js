const fs = require("fs");

const findPattern = (messages) => {
  const pattern = ";handle identify";
  let filter = [];
  messages.forEach((message) => {
    if (message.content.startsWith(pattern)) {
      const cfHandle = message.content.split(";handle identify")[1];
      if (cfHandle)
        filter.push({ username: message.author.username, cfHandle });
    }
  });
  return filter;
};

const writeInFile = (cfHandleList) => {
  const filePath = "./cfHandleList.json";
  const fileContent = JSON.stringify(cfHandleList);

  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(
        `Successfully wrote ${cfHandleList.length} objects to file ${filePath}`
      );
    }
  });
};

module.exports = {
  name: "fetch",
  description: "fetch!",
  roles: [],
  async execute(message, args) {
    // message.reply("Pong!");
    let messages = [];
    let lastID;

    while (true) {
      const options = { limit: 100 };
      if (lastID) {
        options.before = lastID;
      }

      const messagesBatch = await message.channel.messages.fetch(options);
      if (messagesBatch.size === 0) break;

      messages = messages.concat(Array.from(messagesBatch.values()));
      lastID = messagesBatch.last().id;
    }
    const cfHandleList = findPattern(messages);
    console.log(cfHandleList);
    writeInFile(cfHandleList);
  },
};
