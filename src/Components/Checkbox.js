import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const CustomCheckbox = ({ label, defaultChecked = false, onChange }) => {
  const [checked, setChecked] = useState(defaultChecked);

  const handleChange = (event) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    onChange?.(isChecked);
  };
  
  if (!label) {
    return <Checkbox checked={checked} onChange={handleChange} />;
  }

  return (
    <FormControlLabel
      control={<Checkbox checked={checked} onChange={handleChange} />}
      label={label}
    />
  );
};

export default CustomCheckbox;
