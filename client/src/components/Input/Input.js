import React from "react";
import { TextField, InputAdornment } from "@mui/material";
// Input text component
const Input = ({
  name,
  label,
  handleChange,
  autoFocus,
  type,
  handleShowPassword,
  value,
  icon,
}) => (
  <div>
    <TextField
      className="col-12 py-3"
      name={name}
      onChange={handleChange}
      variant="standard"
      required
      label={label}
      autoFocus={autoFocus}
      type={type}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" className="text-dark">
            {icon}
          </InputAdornment>
        ),
      }}
      value={value}
    />
  </div>
);
export default Input;
