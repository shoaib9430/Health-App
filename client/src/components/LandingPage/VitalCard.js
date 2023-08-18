import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";

import { getLatestVital } from "../../api";
// Recieves Vital details via props
export default function VitalCard({
  type,
  lowerLimit,
  higherLimit,
  unit,
  updatedVital,
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ value: "", indicator: "", date: "" });
  useEffect(() => {
    // Fecthes latest vital details
    async function getLatestValue(type) {
      setLoading(true);
      // API call
      let response = await getLatestVital(type);
      setLoading(false);
      if (response.data) {
        // Checks with response and marks it safe or danger
        setData({
          ...response.data,
          indicator:
            response.data.value > lowerLimit &&
            response.data.value < higherLimit
              ? "safe"
              : "danger",
        });
      }
    }
    // First fetch
    if (updatedVital === "") getLatestValue(type);
    // Updated vital reloads and fetches the data again
    else {
      if (updatedVital === type) {
        getLatestValue(type);
      }
    }
  }, [updatedVital, higherLimit, lowerLimit, type]);

  return (
    <Card
      className={`text-center p-2 col-6 col-md-5   col-lg-3 border border-light border-md-none  ${
        data.value
          ? data.indicator === "safe"
            ? "bg-success text-light"
            : "bg-danger text-light"
          : ""
      }`}
    >
      <CardContent>
        {/* Vital Type */}
        <Typography variant="h5" color="text.light" gutterBottom>
          {type}
        </Typography>
        {/* Vital Value */}
        <Typography variant="h3" component="div">
          {loading && <CircularProgress />}
          {!loading && (data.value ? data.value : "-")}
          {data.value && <span className="fs-6">{unit}</span>}
        </Typography>
        {/* Advise */}
        <Typography sx={{ m: 1.5 }} color="text.light">
          {data.value ? (
            data.indicator === "safe" ? (
              <span>
                <CheckCircleIcon /> You are doing Well
              </span>
            ) : (
              <span>
                <ErrorIcon /> You need a check up
              </span>
            )
          ) : (
            "You have no records"
          )}
        </Typography>
      </CardContent>
      {/* Last updation date */}
      <div className="d-flex flex-column">
        <div>Last Updated</div>
        <div>
          {loading && "..."}
          {!loading &&
            (data.date
              ? moment(new Date(data.date)).format("YYYY-MM-DD")
              : "-")}
        </div>
      </div>
    </Card>
  );
}
