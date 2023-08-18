import React, { useEffect } from "react";
import { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Badge from "@mui/material/Badge";
import moment from "moment";

import { toggleIntakeStatus as togglerAPI } from "../../api";

// Checkbox with a label to mark medicine intake status
const MedicineIntake = ({
  setMedicinesForToday,
  medicationTimingIndex,
  med,
}) => {
  // state for intake status
  let [didIntake, setDidIntake] = useState(false);

  let toggleIntakeStatus = async (e) => {
    setDidIntake(!didIntake);
    // API call to mark it completed
    // medicaitionTimingIndex : 0 , 1 , 2 for morning,noon and evening
    await togglerAPI(med._id, medicationTimingIndex);
  };
  useEffect(() => {
    // checks in the medicine.inTakeDates for current date object and updates didIntake state
    const curentUTCString = moment()
      .startOf("day")
      .utc()
      .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    let todaysIntakeStatus = med.intakeDates.find((med) => {
      return med.date === curentUTCString;
    });
    if (todaysIntakeStatus)
      setDidIntake(todaysIntakeStatus[medicationTimingIndex]);
  }, []);

  return (
    <div>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <Checkbox
              id={med._id}
              checked={didIntake}
              onChange={toggleIntakeStatus}
            />
          </ListItemIcon>
          {/* Badge to denote after or before meal course */}
          <Badge
            color="primary"
            badgeContent={
              med.isMealBefore[medicationTimingIndex]
                ? "Before Meal"
                : "After Meal"
            }
            showZero
          >
            <ListItemText
              primary={med.name}
              style={{ width: "80px" }}
              className={`${didIntake && "text-decoration-line-through"} `}
            />
          </Badge>
        </ListItemButton>
      </ListItem>
    </div>
  );
};

export default MedicineIntake;
