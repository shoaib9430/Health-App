import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuthContext } from "../hooks";
import Divider from "@mui/material/Divider";

import Home from "../components/LandingPage/Home";
import LeftSideBar from "../components/SideBar/LeftSideBar";
import RightSideBar from "../components/SideBar/RightSideBar";
import Medicine from "./Medicine";
import Drawer from "@mui/material/Drawer";

const LandingPage = () => {
  const auth = useAuthContext();
  // Tracks the current section to be displayed
  const [currentSection, setCurrentSection] = useState("home");
  // Handles visibilty of drawer in case of mobiles
  const [showDrawer, setShowDrawer] = React.useState({
    left: false,
    right: false,
  });
  // Toggles drawer visibility
  const toggleDrawer = (anchor) => {
    setShowDrawer({ ...showDrawer, [anchor]: !showDrawer[anchor] });
  };
  return (
    <div className="d-flex row ">
      {/* For mobile sidebars are wrapped around MUI drawers */}
      {window.innerWidth >= 992 ? (
        <LeftSideBar setCurrentSection={setCurrentSection} isMobile={false} />
      ) : (
        <Drawer
          PaperProps={{
            sx: { width: "65%" },
          }}
          anchor="left"
          open={showDrawer.left}
          onClose={() => {
            toggleDrawer("left");
          }}
        >
          <LeftSideBar
            isMobile={true}
            setCurrentSection={setCurrentSection}
            toggleDrawer={toggleDrawer}
          />
        </Drawer>
      )}
      <div className="d-flex flex-column col-lg-8">
        {/* Common Header for the landing page */}
        <div className="header text-center ">
          <MenuIcon
            className="d-lg-none float-start mt-1 me-3 cursor-pointer"
            onClick={() => {
              toggleDrawer("left");
            }}
            name="left"
          />
          <AccountCircleIcon
            fontSize="large"
            className="d-lg-none float-end mt-1 me-3 cursor-pointer"
            onClick={() => {
              toggleDrawer("right");
            }}
          />
          <h2 className="text-start mt-3">Hello {auth.user?.name}</h2>
          <h5 className="text-start ms-5 ms-lg-0 text-secondary">
            {currentSection === "home" && "Track your health status!!"}
            {currentSection === "medicine" && "Track your medicines !!"}
          </h5>
          <Divider light />
        </div>
        {/* Renders the current section chosen by the user */}
        {currentSection === "home" && (
          <Home toggleDrawer={toggleDrawer} showDrawer={showDrawer} />
        )}
        {currentSection === "medicine" && <Medicine />}
      </div>
      {/* For mobile sidebars are wrapped around MUI drawers */}
      {window.innerWidth >= 992 ? (
        <RightSideBar setCurrentSection={setCurrentSection} isMobile={false} />
      ) : (
        <Drawer
          anchor="right"
          open={showDrawer.right}
          onClose={() => {
            toggleDrawer("right");
          }}
          PaperProps={{
            sx: { width: "65%" },
          }}
        >
          <RightSideBar
            isMobile={true}
            setCurrentSection={setCurrentSection}
            toggleDrawer={toggleDrawer}
          />
        </Drawer>
      )}
    </div>
  );
};

export default LandingPage;
