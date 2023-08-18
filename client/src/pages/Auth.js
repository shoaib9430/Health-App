import React, { useEffect, useState } from "react";
import { Avatar, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";

import Input from "../components/Input/Input";
import { notify } from "../components/Misc/Notification";
import { signup } from "../api";
import { useAuthContext } from "../hooks";
import landing_illustration from "../assets/landing_illus.png";

const Auth = () => {
  const navigate = useNavigate();
  // Context hook for user functionalities
  const auth = useAuthContext();

  // Initial form data
  const initialState = {
    phone: "",
    name: "",
    password: "",
    confirmPassword: "",
  };
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  // If user is logged in
  useEffect(() => {
    if (auth.user) {
      navigate("/");
      return;
    }
  }, []);
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  // Switches between login and sign up form
  const switchMode = () => {
    setFormData(initialState);
    setIsSignUp(!isSignUp);
  };
  // Handles Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isSignUp) {
      // User Registration

      // Checks Phone Number Format
      if (
        formData.phone.length !== 10 ||
        !/^\+?[0-9]+(?:[-\s][0-9]+)*$/.test(formData.phone)
      ) {
        notify().error("Invalid Phone number");
        setLoading(false);
        return;
      }
      // Checks Password validity
      if (formData.password.length < 6) {
        notify().error("Password minimum 6 characters");
        setLoading(false);
        return;
      }
      // Matches pasword and confirm password
      if (formData.password !== formData.confirmPassword) {
        notify().error("Passwords donot match");
        setLoading(false);
        return;
      }
      // Send registration request
      let response = await signup(formData);
      if (response.success) {
        notify().success("Successful Sign up");
        switchMode();
      } else {
        // Failure
        notify().error(response.message);
      }
      setLoading(false);
    } else {
      // User Login
      const response = await auth.login(formData);
      if (!response) {
        notify().success("Welcome");
        navigate("/");
      } else {
        notify().error(response.message);
      }
      setLoading(false);
    }
  };
  // handles input change
  // names are attached to different input fields  which is used to update the correspong state object value.
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-fluid d-flex flex-column flex-lg-row mx-auto align-items-center justify-content-center  ">
      {" "}
      <div className="col-10 col-lg-6 text-center ">
        <img src={landing_illustration} alt="" className="col-12" />
        <div className="fw-bolder  d-md-none ">
          {" "}
          <span className="">
            {" "}
            Keep track of vital health metrics, set medication schedule and
            manage doctor appointments
          </span>
        </div>
        <div className="fw-bolder d-none d-md-block ">
          {" "}
          <span className="fs-3">
            {" "}
            Keep track of vital health metrics, set medication schedule and
            manage doctor appointments
          </span>
        </div>
      </div>
      <div className=" col-12 col-lg-6 col-lg-4 text-center ">
        <Paper className=" text-center mt-3 p-4">
          <Avatar className="mx-auto mb-2">
            <LockIcon />
          </Avatar>
          <Typography variant="h4">{isSignUp ? "Sign up" : "Login"}</Typography>
          <form onSubmit={handleSubmit}>
            <div className="d-flex flex-column gap-2 p-1">
              {/* Phone Number */}
              <Input
                name="phone"
                label="Phone Number"
                handleChange={handleChange}
                autoFocus
                type="text"
                required
                value={formData.phone}
                icon={<LocalPhoneIcon />}
              />
              {/* Name : for registration */}
              {isSignUp && (
                <>
                  <Input
                    name="name"
                    label="Name"
                    handleChange={handleChange}
                    value={formData.name}
                    icon={<PersonIcon />}
                  />
                </>
              )}
              {/* Password */}
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                handleShowPassword={handleShowPassword}
                type={showPassword ? "text" : "password"}
                value={formData.password}
                icon={<LockIcon />}
              />
              {/* Confirm Password : for registration */}
              {isSignUp && (
                <Input
                  name="confirmPassword"
                  label="Confirm Password"
                  handleChange={handleChange}
                  type="text"
                  icon={<LockIcon />}
                />
              )}
              {/* Submit Button */}
              <input
                type="submit"
                className="btn btn-dark col-12 mt-4 mx-auto rounded bg-dark  "
                variant=""
                value={
                  isSignUp
                    ? loading
                      ? "Signing..."
                      : "Sign up"
                    : loading
                    ? "Logging..."
                    : "Login"
                }
                disabled={loading ? true : false}
              />
            </div>
          </form>
          {/* Toggles between login and sign up */}
          <Button className="text-end mt-2 " onClick={switchMode}>
            <u className=" ">
              {isSignUp
                ? "Already have an Account? Login"
                : "Don't have an account ? Sign up "}
            </u>
          </Button>
        </Paper>
      </div>
    </div>
  );
};

export default Auth;
