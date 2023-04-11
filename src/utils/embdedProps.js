const { createEmbeddedMessage } = require("./../utils/embded");

module.exports = ({ title, description }) => {
  let props = {};
  props.title = title;
  props.description = description;
  return createEmbeddedMessage(props);
};
