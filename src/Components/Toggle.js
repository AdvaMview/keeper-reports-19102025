import React from "react";
import { useSelector } from "react-redux";

export const Toggle = ({ handleChange, isChecked }) => {
  const palette = useSelector((state) => state.appSettings.selectedPalette);

  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
    },
    switch: {
      width: "50px",
      height: "25px",
      backgroundColor: isChecked ? palette.primary.light : palette.primary.dark,
      borderRadius: "25px",
      position: "relative",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    knob: {
      position: "absolute",
      top: "2px",
      left: isChecked ? "26px" : "2px",
      width: "21px",
      height: "21px",
      backgroundColor: "white",
      borderRadius: "50%",
      transition: "left 0.3s",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.switch} onClick={handleChange}>
        <div style={styles.knob} />
      </div>
    </div>
  );
};
