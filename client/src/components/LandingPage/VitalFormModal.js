import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import SelectInput from "../Input/SelectInput";
import { addVital } from "../../api";
import { notify } from "../Misc/Notification";
import moment from "moment";

const VitalFormModal = ({ show, handleClose, setUpdatedVital }) => {
  // Vitals
  const vitalTypes = {
    Sugar: "mg/dL",
    SPO2: "%",
    Systolic: "mmHg",
    Diastolic: "mmHg",
  };

  const initialState = {
    type: "Sugar",
    value: "",
    date: "",
  };
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [currentVital, setCurrentVital] = useState("Sugar");

  // Handles change of the input feilds and updates the correspoing feild in formData
  const handleChange = (e) => {
    if (!e) return;
    if (!e.target) {
      // Time updation
      setFormData({ ...formData, date: e._d.toUTCString() });
    } else {
      if (e.target.name === "type") {
        setCurrentVital(e.target.value);
      }
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  // Handles Form Submission
  const handleAddVital = async () => {
    // Validating form data
    // Vital value must be numeric
    if (!/^\d+(\.\d+)?$/.test(formData.value)) {
      return notify().error("Enter only numeric vital values");
    }
    // Date format
    if (formData.date === "" || formData.date === "Invalid Date") {
      return notify().error("Enter Valid Date");
    }
    setLoading(true);
    // API call to add vital
    const response = await addVital(formData);
    if (response.success) {
      setUpdatedVital(currentVital);
      notify().success("Record Added");
      handleClose();
    } else {
      notify().error("Failed");
    }
    setLoading(false);
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update vital</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Select Vital type */}
        <SelectInput
          label={"Type"}
          options={Object.keys(vitalTypes)}
          handleChange={handleChange}
          helperText={"Please Choose Vital Type"}
          name={"type"}
          value={currentVital}
        />
        {/* Value of the vital */}
        <FormControl className="ms-4" variant="outlined">
          <OutlinedInput
            id="outlined-adornment-weight"
            endAdornment={
              <InputAdornment position="end">
                {vitalTypes[currentVital]}
              </InputAdornment>
            }
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              "aria-label": "weight",
            }}
            onChange={handleChange}
            name="value"
          />
        </FormControl>
        {/* Updation Date */}
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DateField name="date" onChange={handleChange} format="DD-MM-YYYY" />
        </LocalizationProvider>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleAddVital}
          disabled={isLoading && true}
        >
          {isLoading ? "Adding..." : "Add"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VitalFormModal;
