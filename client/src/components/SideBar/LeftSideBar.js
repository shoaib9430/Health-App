import React from "react";
import src from "../../assets/brand.png";
import HomeIcon from "@mui/icons-material/Home";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAuthContext } from "../../hooks";
import { useNavigate } from "react-router-dom";

const LeftSideBar = ({ isMobile, setCurrentSection, toggleDrawer }) => {
  // Handles navigation via setCurrentSection
  const auth = useAuthContext();
  const navigate = useNavigate();
  return (
    <div
      style={{ height: "100vh" }}
      className={`side-bar-left  
      ${
        isMobile
          ? "d-flex  col-11 flex-column mx-auto "
          : " d-none d-lg-flex col-2 border-end border-2  flex-column"
      }
      `}
    >
      <div
        className="text-end mt-3 d-lg-none"
        onClick={() => {
          if (isMobile) toggleDrawer("left");
        }}
      >
        <CancelIcon />
      </div>
      <div className="brand pb-5">
        {" "}
        <img src={src} alt="" className="col-10" />
      </div>
      <div
        className="col-12 d-flex flex-column align-items-center gap-4 fs-5 
"
      >
        {/* Home */}
        <div
          className="d-flex gap-3 hovered-button col-12 text-center p-2 justify-content-center"
          onClick={() => {
            setCurrentSection("home");
            if (isMobile) toggleDrawer("left");
          }}
        >
          <HomeIcon fontSize="large" />
          Home
        </div>
        {/* Medicines */}
        <div
          className="d-flex gap-3 hovered-button col-12 text-center p-2 justify-content-center "
          onClick={() => {
            setCurrentSection("medicine");
            isMobile && toggleDrawer("left");
          }}
        >
          <VaccinesIcon fontSize="large" /> Medication
        </div>
      </div>
      <div
        className=" text-center mt-auto  mb-5 hovered-button p-2"
        onClick={() => {
          auth.logout();
          navigate("/auth");
        }}
      >
        {/* Logout Button */}
        <RemoveCircleIcon fontSize="large" /> Logout
      </div>
    </div>
  );
};

export default LeftSideBar;
