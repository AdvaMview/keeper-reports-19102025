import React from "react";
import { useSelector } from "react-redux";
import { Switch } from "@mui/material";

export const Toggle = ({ handleChange, isChecked }) => {
  const palette = useSelector((state) => state.appSettings.selectedPalette);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Switch
        checked={isChecked}
        onChange={handleChange}
        style={{
          color: palette.primary,
        }}
      />
    </div>
  );
};
