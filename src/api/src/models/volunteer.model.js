const mongoose = require("mongoose");

const toJSON = require("../utils/toJSON");

const { ObjectId } = mongoose.Types;

const volunteerSchema = mongoose.Schema(
  {
    discordId: {
      type: String,
      required: true,
      unique: true,
    },
    history: [Object],
    contribution: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

toJSON(volunteerSchema);

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

module.exports = Volunteer;
