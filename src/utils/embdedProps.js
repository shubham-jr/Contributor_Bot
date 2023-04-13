const {
  createEmbeddedMessage,
  singleMessageEmbedded,
} = require("./../utils/embded");

module.exports = ({ title, description }) => {
  let props = {};
  props.title = title;
  props.description = description;
  return description && description !== ""
    ? createEmbeddedMessage(props)
    : singleMessageEmbedded(props);
};
