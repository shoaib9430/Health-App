import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { TextField } from "@mui/material";
import { notify } from "../Misc/Notification";
import SelectInput from "../Input/SelectInput";
import { addMedicine } from "../../api";
import DosageTimmingInput from "../Input/DosageTimmingInput";
const MedicineFormModal = ({ show, handleClose, setMedicine }) => {
  // medicine type list
  const medicineTypes = {
    Capsule: "mmg",
    Syrup: "ml",
    Intravenous: "ml",
  };
  const initialState = {
    type: "Capsule",
    name: "",
    doctor: "",
    dosage: "",
    startingDate: "",
    duration: "",
    medicationTiming: [false, false, false],
    isMealBefore: [false, false, false],
  };
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [currentMedicine, setCurrentMedicine] = useState("Capsule");

  const handleChange = (e) => {
    if (!e) return;
    // Time updation
    if (!e.target) {
      setFormData({ ...formData, startingDate: e._d.toUTCString() });
    } else {
      if (e.target.name === "type") {
        setCurrentMedicine(e.target.value);
      }
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleAddMedicine = async () => {
    // Validates starting date
    if (
      formData.startingDate === "" ||
      formData.startingDate === "Invalid Date"
    ) {
      return notify().error("Enter Valid Date");
    }
    if (!/^\+?[0-9]+(?:[-\s][0-9]+)*$/.test(formData.dosage))
      return notify().error("Dosage should be numeric");
    //Checks if atleast one dosage timing is selected
    if (
      formData.medicationTiming.filter((optn) => (!optn ? false : true))
        .length === 0
    )
      return notify().error("Atleast select one medicaition timing");

    setLoading(true);
    const response = await addMedicine(formData);
    // Notify
    if (response.success) {
      notify().success("Medicine Added");
      handleClose();
      setMedicine((oldData) => [...oldData, response.data]);
    } else {
      notify().error("Failed");
    }
    setLoading(false);
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Medicine</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Select Medicine type */}
        <div className="row">
          <FormControl className="col">
            <SelectInput
              label={"Type"}
              options={Object.keys(medicineTypes)}
              handleChange={handleChange}
              name={"type"}
              value={currentMedicine}
            />
          </FormControl>
          {/* Medicine Name */}
          <FormControl className="col">
            <TextField
              required
              name="name"
              onChange={handleChange}
              placeholder="Medicine Name"
            />
          </FormControl>
        </div>
        {/* Medicine dosage */}
        <div className="row">
          <FormControl className="col">
            <OutlinedInput
              endAdornment={
                <InputAdornment position="end">
                  {medicineTypes[currentMedicine]}
                </InputAdornment>
              }
              placeholder="Dosage"
              onChange={handleChange}
              name="dosage"
            />
          </FormControl>
          {/* Doctor who prescribed */}
          <FormControl className="col">
            <OutlinedInput
              startAdornment={
                <InputAdornment position="start">Dr.</InputAdornment>
              }
              onChange={handleChange}
              name="doctor"
              placeholder="Name of the doctor"
            />
          </FormControl>
        </div>
        <div className="row">
          {/* Starting Date */}
          <FormControl className="col">
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DateField
                name="startingDate"
                onChange={handleChange}
                format="DD-MM-YYYY"
              />
            </LocalizationProvider>
            <FormHelperText>Starting Date</FormHelperText>
          </FormControl>
          {/* Dosage Duration */}
          <FormControl className="col">
            <TextField
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              name="duration"
              onChange={handleChange}
            />
            <FormHelperText>Duration in days</FormHelperText>
          </FormControl>
        </div>
        {/* Dosage timing */}
        <div className="col-12 col-md-7">
          <DosageTimmingInput
            label={"Breakfast"}
            setFormData={setFormData}
            index={0}
          />
          <DosageTimmingInput
            label={"Lunch"}
            setFormData={setFormData}
            index={1}
          />
          <DosageTimmingInput
            label={"Dinner"}
            setFormData={setFormData}
            index={2}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleAddMedicine}
          disabled={isLoading && true}
        >
          {isLoading ? "Adding..." : "Add"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MedicineFormModal;
