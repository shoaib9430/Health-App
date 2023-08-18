import React from "react";
import VitalCard from "./VitalCard";
const Vitals = ({ updatedVital }) => {
  // Vital types
  const vitalTypes = {
    Sugar: { unit: "mg/dL", lowerLimit: 70, higherLimit: 110 },
    SPO2: { unit: "%", lowerLimit: 90, higherLimit: 100 },
    Diastolic: { unit: "mmHg", lowerLimit: 60, higherLimit: 90 },
    Systolic: { unit: "mmHg", lowerLimit: 110, higherLimit: 140 },
  };
  return (
    <div className="d-flex flex-row  flex-md-row flex-wrap flex-lg-nowrap justify-content-md-center align-items-stretch align-items-md-center  align-items-lg-stretch  gap-md-1">
      {Object.keys(vitalTypes).map((type, index) => {
        return (
          <VitalCard
            key={`a-${index}`}
            type={type}
            unit={vitalTypes[type].unit}
            lowerLimit={vitalTypes[type].lowerLimit}
            higherLimit={vitalTypes[type].higherLimit}
            updatedVital={updatedVital}
          />
        );
      })}
    </div>
  );
};

export default Vitals;
