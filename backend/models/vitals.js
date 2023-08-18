const mongoose = require("mongoose");

//Schema Definition

const VitalSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Model Definition
const vitals = mongoose.model("Vital", VitalSchema);
module.exports = vitals;
