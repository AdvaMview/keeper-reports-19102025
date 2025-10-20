import  React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function RadioButton({
  label,
  name,
  options = [],
  value,
  onChange,
}) {
  return (
    <FormControl>
      {label && <FormLabel id={`${name}-label`}>{label}</FormLabel>}
      <RadioGroup
        aria-labelledby={`${name}-label`}
        name={name}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      >
        {options.map((opt) => (
          <FormControlLabel
            key={opt.value}
            value={opt.value}
            control={<Radio />}
            label={opt.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

