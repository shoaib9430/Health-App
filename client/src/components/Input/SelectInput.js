import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
// Select input component from options
const SelectInput = ({
  name,
  label,
  options,
  helperText,
  value,
  handleChange,
}) => {
  return (
    <TextField
      id="outlined-select-currency"
      select
      name={name}
      label={label}
      helperText={helperText}
      required
      value={value}
      onChange={handleChange}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectInput;
