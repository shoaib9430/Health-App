import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import MedicineCard from "../components/Medicine/MedicineCard";
import MedicineFormModal from "../components/Medicine/MedicineForm";

import { getMedicines, deleteMedicine } from "../api";
import { notify } from "../components/Misc/Notification";
export default function Medicine() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  // Stores medicine
  const [medicine, setMedicine] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState({
    id: "",
    show: false,
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async () => {
    setLoading(true);
    let response = await deleteMedicine(showDeleteModal.id);
    console.log(response);
    if (response.success) {
      notify().success("Successfully Deleted");
      setMedicine((med) => {
        const newMed = med.filter((medi) => {
          if (medi._id === showDeleteModal.id) return false;
          return true;
        });
        return newMed;
      });
    }
    setLoading(false);
    setShowDeleteModal({ ...showDeleteModal, show: false });
  };
  useEffect(() => {
    setLoading(true);
    // Fetches medicine list
    let fetch = async () => {
      const response = await getMedicines();
      if (response) setMedicine(response.data);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div className="d-flex flex-column  col-12 p-4">
      {/* add medicine form */}
      <div className="d-flex gap-4">
        <div>
          {" "}
          <span className="badge bg-secondary">AC</span> : Before Meal
        </div>
        <div>
          <span className="badge bg-secondary">PC</span> : After Meal
        </div>
      </div>
      <MedicineFormModal
        show={show}
        handleClose={handleClose}
        setMedicine={setMedicine}
      />
      <div className=" align-self-end">
        <AddCircleIcon
          className="cursor-pointer"
          style={{ fontSize: "3rem" }}
          onClick={handleShow}
        />
      </div>
      {loading ? (
        <div className="container text-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="d-flex gap-1 flex-wrap">
          {medicine.length === 0 && (
            <div className="container text-center">
              {" "}
              You have no added medicines
            </div>
          )}
          {medicine.map((med) => {
            return (
              <MedicineCard
                medicine={med}
                setShowDeleteModal={setShowDeleteModal}
              />
            );
          })}
        </div>
      )}
      <Modal
        show={showDeleteModal.show}
        onHide={() => {
          setShowDeleteModal({ id: "", show: false });
        }}
      >
        {/* Confirm Delete modal */}
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          Are you sure you want to delete
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowDeleteModal({ ...showDeleteModal, show: false });
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={loading && true}
            variant="danger"
            onClick={handleDelete}
          >
            {loading ? "Deleting" : "Delete"}{" "}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
