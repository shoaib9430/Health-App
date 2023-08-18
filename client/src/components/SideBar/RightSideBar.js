import { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import List from "@mui/material/List";
import { notify } from "../Misc/Notification";
import MedicineIntake from "../Input/MedicineIntake";
import CircularProgress from "@mui/material/CircularProgress";

import { getMedicineForToday } from "../../api";
import { useAuthContext } from "../../hooks";

const RightSideBar = ({ isMobile, setCurrentSection, toggleDrawer }) => {
  // Responsive designed.isMobile is boolean flag for a device to be mobile
  let auth = useAuthContext();
  const [loading, setLoading] = useState(false);
  // Medicine list for the day
  const [medicinesForToday, setMedicinesForToday] = useState([]);
  useEffect(() => {
    // Fetches medicine list for the day
    const fetchTodayMedicines = async () => {
      setLoading(true);
      const response = await getMedicineForToday();
      if (response.success) {
        setMedicinesForToday(response.data);
      } else {
        notify().error("Failed");
      }
      setLoading(false);
    };
    fetchTodayMedicines();
  }, []);

  return (
    <div
      style={{ height: "100vh", overflow: "scroll" }}
      className={`side-bar-right
    
    ${isMobile ? "d-block " : "d-none d-lg-block col-2 border"}
    
    `}
    >
      <div
        className="text-start mt-3 d-lg-none"
        onClick={() => {
          if (isMobile) toggleDrawer("right");
        }}
      >
        <CancelIcon />
      </div>
      <div
        className="col-11 col-md-6 col-lg-10 mx-auto my-2 p-4"
        style={{ backgroundColor: "#f3f2f2", borderRadius: "12.5%" }}
      >
        <div>
          <div
            style={{ width: "70px", height: "70px", borderRadius: "50%" }}
            className="bg-dark text-light mx-auto border border-2 d-flex justify-content-center align-items-center fs-3"
          >
            {auth.user?.name.charAt(0)}
          </div>
        </div>
        <div className="text-secondary  text-center mt-4">
          {" "}
          <div>{auth.user?.name}</div>
          <div>{auth.user?.phone}</div>
        </div>
      </div>
      <div>
        {loading ? (
          <div className="container text-center mt-4">
            {" "}
            <CircularProgress />
          </div>
        ) : (
          <div className="overflow-hidden">
            <h6 className="text-center text-secondary text-decoration-underline">
              Medcines for the day
            </h6>
            {/* Morning */}
            <h5 className="fw-bold mx-3 text-decoration-underline">Morning</h5>
            <List>
              {medicinesForToday.map((med) => {
                if (med.medicationTiming[0])
                  return (
                    <MedicineIntake
                      setMedicinesForToday={setMedicinesForToday}
                      med={med}
                      medicationTimingIndex={0}
                    />
                  );
                return <></>;
              })}
            </List>
            {/* Noon  */}

            <h5 className="fw-bold mx-3 text-decoration-underline">Noon</h5>
            <List>
              {medicinesForToday.map((med) => {
                if (med.medicationTiming[1])
                  return (
                    <MedicineIntake
                      setMedicinesForToday={setMedicinesForToday}
                      med={med}
                      medicationTimingIndex={1}
                    />
                  );
                return <></>;
              })}
            </List>
            {/* Evening  */}
            <h5 className="fw-bold mx-3 text-decoration-underline">Evening</h5>
            <List>
              {medicinesForToday.map((med) => {
                if (med.medicationTiming[2])
                  return (
                    <MedicineIntake
                      setMedicinesForToday={setMedicinesForToday}
                      med={med}
                      medicationTimingIndex={2}
                    />
                  );
                return <></>;
              })}
            </List>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSideBar;
