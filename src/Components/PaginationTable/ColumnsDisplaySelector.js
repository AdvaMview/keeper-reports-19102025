import { List, ListItem, Typography, Switch } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const ColumnsDisplaySelector = ({
  dataFunctionName,
  onColumnDisplayToggleSelected,
}) => {
  const { tableColumns: columns } = useSelector(
    (state) => state.dataSource[dataFunctionName]
  );

  return (
    <List>
      <>
        {columns &&
          columns.map((col) => {
            return (
              <ListItem
                key={col.field}
                dense
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography>{col.field}</Typography>
                <Switch
                  checked={!col.hidden}
                  disabled={!col.anableHideColumn}
                  onChange={() => onColumnDisplayToggleSelected(col)}
                  color="primary"
                  name={`${col.field}-colIsHidden`}
                  inputProps={{ "aria-label": "primary checkbox" }}
                  size="small"
                />
              </ListItem>
            );
          })}
      </>
    </List>
  );
};

export default ColumnsDisplaySelector;
