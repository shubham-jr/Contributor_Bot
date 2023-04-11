require("dotenv").config({ path: __dirname + "/../.env" });

module.exports = {
  env: process.env.NODE_ENV || "production",
  port: process.env.PORT,
  discordBotToken: process.env.DISCORD_BOT_TOKEN,
  prefix: process.env.PREFIX,
  skipForumChannelIds: JSON.parse(process.env.SKIP_FORUM_CHANNEL_IDS),
  validEmojis: JSON.parse(process.env.VALID_EMOJIS),
  botChannelId: process.env.BOT_CHANNEL_ID,
};
