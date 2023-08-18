const Medicine = require("../../../models/medicaiton");
// Adds new medicine
module.exports.add = async (req, res) => {
  try {
    const userID = req.user.id;
    let newMedicine = { ...req.body, userID };
    let createdMed = await Medicine.create(newMedicine);
    return res.status(200).json({
      data: createdMed,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
// Get Medicine List
module.exports.getMedicines = async (req, res) => {
  try {
    const userID = req.user.id;
    const medicines = await Medicine.find({ userID });

    return res.status(200).json({
      data: medicines,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
// Get medicines to intake for a date
module.exports.getMedicineForDate = async (req, res) => {
  try {
    const userID = req.user.id;
    const desiredDate = new Date(req.params.date);
    // Checks if the date falls within the end date of a medicine which is calculated using starting date and duration
    let medicineForToday = await Medicine.aggregate([
      {
        $addFields: {
          endDate: {
            $dateAdd: {
              startDate: "$startingDate",
              unit: "day",
              amount: "$duration",
            },
          },
        },
      },
      {
        $match: {
          endDate: { $gt: desiredDate },
          userID: userID,
        },
      },
    ]);

    return res.status(200).json({
      data: medicineForToday,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Toggle intake status of a medicine for a date
// timingIndex refers to the time of the day for which the intake status is to be toggled.
// 0 -> morning 1->afternoon 2->evening
// intakeDates is [] of objects with keys -> {date,0,1,2} where '0','1' and '2' represents timingIndex
module.exports.toggleIntakeStatus = async (req, res) => {
  try {
    const userID = req.user.id;
    // id -> medicine ID
    const { id, dateOfIntake, timingIndex } = { ...req.body };
    let medicineTobeUpdated = await Medicine.findById(id);

    // Finds if intakeDates has object with date as the dateOfIntake
    let medicineIntakeObject = medicineTobeUpdated.intakeDates.find((med) => {
      return med.date === dateOfIntake;
    });
    if (medicineIntakeObject) {
      // If Found
      // the intake status for timing index is toggled
      medicineIntakeObject[timingIndex] = !medicineIntakeObject[timingIndex];
      // Updated intakeDates
      let updatedIntakeList = medicineTobeUpdated.intakeDates.map(
        (date_obj) => {
          if (date_obj.date === dateOfIntake) {
            return medicineIntakeObject;
          }
          return date_obj;
        }
      );
      // Updated
      await Medicine.findByIdAndUpdate(id, {
        $set: { intakeDates: updatedIntakeList },
      });
    } else {
      // The medicine intake status for date of intake is not found.
      // The intake flag is to be toggled true
      // . So a new object is to created with date and flag and added to the intakeDates list.
      medicineIntakeObject = {};
      // setting the date key of the new object  as day of intake.
      medicineIntakeObject["date"] = dateOfIntake;
      // Marking it as complete
      medicineIntakeObject[timingIndex] = true;
      medicineTobeUpdated.intakeDates.push(medicineIntakeObject);
    }
    medicineTobeUpdated.save();
    return res.status(200).json({
      message: "Toggled",
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.delete = async (req, res) => {
  try {
    const medicineID = req.params.id;

    await Medicine.findByIdAndDelete(medicineID);

    return res.status(200).json({
      message: "Successsfully deleted",
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
