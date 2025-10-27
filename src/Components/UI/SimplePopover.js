import React from "react";
import Popover from "@mui/material/Popover";

const SimplePopover = (props) => {
  return (
    <Popover
      open={props.open}
      anchorEl={props.anchorEl}
      onClose={props.handleClose}
      anchorOrigin={{
        vertical: props.anchorTop ?? "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: props.anchorHorizontal ?? "center",
      }}
      PaperProps={{
        sx: {
          p: 2,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "background.paper",
        },
      }}
    >
      {props.children}
    </Popover>
  );
};

export default React.memo(SimplePopover);
