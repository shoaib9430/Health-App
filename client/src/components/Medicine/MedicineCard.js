import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import moment from "moment";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import pill from "../../assets/pill.png";
import syringe from "../../assets/syringe.png";
import syrup from "../../assets/syrup.png";
// Displays the medicine information
const MedicineCard = ({ medicine, setShowDeleteModal }) => {
  const {
    type,
    name,
    doctor,
    dosage,
    startingDate,
    duration,
    medicationTiming,
    isMealBefore,
  } = {
    ...medicine,
  };
  const id = medicine._id;
  return (
    <Card className="col-lg-3 ">
      <CardContent className="">
        {/* Medicine type and name */}
        <Typography className="text-center" color="text.secondary" gutterBottom>
          <img
            className="col-2 mx-2"
            src={type === "Capsule" ? pill : type === "Syrup" ? syrup : syringe}
            alt=""
          />
          {name}
        </Typography>

        {/* Medicine dosage amount */}
        <Typography className="text-center mb-2" component="div">
          {dosage} {type === "Capsule" ? "mmg" : "ml"}
        </Typography>

        {/* Medicine prescribed by */}
        <Typography>- Dr.{doctor}</Typography>

        {/* Medicine starting date */}
        <Typography>
          - Starts :{" "}
          <span className="fw-bold">
            {moment.utc(startingDate).local().format("DD-MM-YYYY")}
          </span>
        </Typography>
        {/* Medicine duration date */}
        <Typography>
          {" "}
          - Duration : <span className="fw-bold">{duration} </span>days
        </Typography>
        {/* Medicine time */}
        {medicationTiming.map((time, index) => {
          if (time) {
            return (
              <Chip
                avatar={
                  <Avatar className="fw-bold">
                    {isMealBefore[index] ? "AC" : "PC"}
                  </Avatar>
                }
                label={
                  index === 0 ? "Breakfast" : index === 1 ? "Lunch" : "Dinner"
                }
              />
            );
          }
          return <></>;
        })}
      </CardContent>
      <CardActions className="text-center container  mt-auto ">
        <IconButton
          className="text-danger border mx-auto"
          onClick={() => {
            setShowDeleteModal({ id, show: true });
          }}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default MedicineCard;
