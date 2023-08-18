import React, { useState } from "react";
import Vitals from "./Vitals";
import Button from "@mui/material/Button";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import VitalFormModal from "./VitalFormModal";
const Home = ({ toggleDrawer, showDrawer }) => {
  const [show, setShow] = useState(false);
  // toggles vital updation form visibility
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // state to mark updated vital to update data via API call
  const [updatedVital, setUpdatedVital] = useState("");
  return (
    <div className="col-12  py-1 px-3">
      {/* Button:toggles vital updation form visibility */}
      <div className="text-end">
        <Button
          className="bg-dark col-3  my-2 mb-4"
          variant="contained"
          onClick={handleShow}
        >
          Add
          <AddCircleOutlineOutlined className="mx-2" />
        </Button>
      </div>

      {/* Vitals */}
      <Vitals updatedVital={updatedVital} />
      <div className="card"></div>
      {/* Vital updatiion Form */}
      <VitalFormModal
        show={show}
        handleClose={handleClose}
        setUpdatedVital={setUpdatedVital}
      />
    </div>
  );
};

export default Home;
