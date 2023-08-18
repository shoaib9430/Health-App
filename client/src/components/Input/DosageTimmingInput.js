import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";

import { Select } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

// Input component for dosage timing and post meal or pre meal
// setFormData contains the add medicine form data
// index is to mark the appropiate element for mealTiming[]
const DosageTimmingInput = ({ label, index, setFormData }) => {
  const handleChange = (e) => {
    if (e.target.name === "isMealBefore") {
      setFormData((oldFormData) => {
        const isMealBefore = [...oldFormData.isMealBefore];
        isMealBefore[index] = e.target.value;
        return { ...oldFormData, isMealBefore: isMealBefore };
      });
    } else {
      setFormData((oldFormData) => {
        const medicationTiming = [...oldFormData.medicationTiming];
        medicationTiming[index] = !medicationTiming[index];
        return { ...oldFormData, medicationTiming: medicationTiming };
      });
    }
  };
  return (
    <div className="d-flex justify-content-between">
      {/* Checkbox to mark a timing */}
      <FormControlLabel
        control={<Checkbox />}
        label={label}
        onChange={handleChange}
      />
      {/* Input Select to choose before or after meal */}
      <FormControl size="small">
        <Select
          defaultValue={false}
          onChange={handleChange}
          name="isMealBefore"
        >
          <MenuItem value={true}>Before Meal</MenuItem>
          <MenuItem selected value={false}>
            After Meal
          </MenuItem>
        </Select>{" "}
      </FormControl>
    </div>
  );
};

export default DosageTimmingInput;
