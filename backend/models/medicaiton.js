const mongoose = require("mongoose");

//Schema Definition

const MedicineSchema = new mongoose.Schema(
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
    name: {
      type: String,
      required: true,
    },
    dosage: {
      type: String,
      required: true,
    },
    doctor: {
      type: String,
      required: true,
    },
    startingDate: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    medicationTiming: {
      type: Array,
      required: true,
    },
    isMealBefore: {
      type: Array,
      required: true,
    },
    intakeDates: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

//Model Definition
const medicines = mongoose.model("Medicine", MedicineSchema);
module.exports = medicines;
