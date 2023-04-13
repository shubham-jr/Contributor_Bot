const config = require("../utils/config");
const isValid = require("../utils/isValid");
const { updateContribution } = require("../utils/apiControllers");

async function getThreadDetails(thread) {
  const threadMessages = await thread.messages.fetch({
    after: 1,
    limit: 1,
  });

  const firstMessage = threadMessages.first();
  return {
    name: thread.name,
    id: thread.id,
    creator: {
      name: firstMessage.author.username,
      id: firstMessage.author.id,
    },
  };
}

function getForumDetails(thread) {
  return {
    name: thread.parent.name,
    id: thread.parent.id,
  };
}

function getReactedUserDetails(user) {
  return { id: user.id, tag: user.tag };
}

async function getOPOfReactedMessageDetails(thread, reaction) {
  const message = await thread.messages.fetch(reaction.message.id);
  return {
    id: message.author.id,
    name: message.author.username,
  };
}

function getEmojiDetails(reaction) {
  const value = reaction.emoji.name === "__positive" ? -1 : -(-1);
  return { name: reaction.emoji.name, value };
}

function event() {
  return "messageReactionRemove";
}

async function getMessageReactionInfo({ thread, user, reaction }) {
  let messageReactionInfo = {};

  messageReactionInfo.event = event();
  messageReactionInfo.forum = getForumDetails(thread);
  messageReactionInfo.reactedUser = getReactedUserDetails(user);
  messageReactionInfo.emoji = getEmojiDetails(reaction);
  messageReactionInfo.thread = await getThreadDetails(thread);
  messageReactionInfo.OPOfReactedMessage = await getOPOfReactedMessageDetails(
    thread,
    reaction
  );

  return messageReactionInfo;
}

module.exports = {
  name: "messageReactionRemove",
  async execute(reaction, user, client) {
    const thread = await client.channels.fetch(reaction.message.channel.id);
    const message = await thread.messages.fetch(reaction.message.id);

    console.log("chal gaya", reaction.emoji.name);

    if (
      !thread ||
      !thread.parent ||
      !isValid.channel(thread.parent) ||
      !isValid.emoji(reaction.emoji.name) ||
      !isValid.reaction(user, message)
    )
      return;

    const messageReactionInfo = await getMessageReactionInfo({
      thread,
      reaction,
      user,
    });

    console.log(messageReactionInfo);
    await updateContribution(messageReactionInfo);
  },
};
