const Vital = require("../../../models/vitals");
// creates a new record for a vital
module.exports.add = async function (req, res) {
  try {
    const userID = req.user.id;
    const newVital = { userID, ...req.body };
    await Vital.create(newVital);
    return res.status(200).json({
      message: "Record Added",
    });
  } catch (e) {
    return res.status(500).json({
      message: "Record Could not be added",
    });
  }
};
// Get latest vital record
module.exports.getLatestVital = async function (req, res) {
  try {
    const userID = req.user.id;
    const type = req.params.type;

    const lastAddedVital = await Vital.findOne({ userID, type })
      .sort({ createdAt: -1 }) // Sort in descending order based on createdAt
      .exec();
    return res.status(200).json({
      data: lastAddedVital,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Record Could not be added",
    });
  }
};
