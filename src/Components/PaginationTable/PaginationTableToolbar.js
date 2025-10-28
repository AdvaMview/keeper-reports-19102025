import React from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import { IconButton, Tooltip, Box, Typography } from "@mui/material";
// import ExcelIcon from '/static/images/icons/ExcelIcon.svg'
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
// import FormatClearIcon from "@mui/icons-material/FormatClear";
import DescriptionIcon from "@mui/icons-material/Description";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

const PaginationTableToolbar = (props) => {
  const {
    exportToExcel,
    exportToCsv,
    hideFilters,
    setHideFilters,
    handleColumnHideToggle,
    // handleClearAllFilters,
    resetDataSource,
    anableSelectRows,
    bulkOperation,
    selectedRecords,
    includeIds,
    excludeIds,
    setSelectedRecord,
    setSelectedAllRecords,
  } = props;

  const onFinishCallBack = () => {
    setSelectedRecord([]);
    setSelectedAllRecords(false);
  };

  return (
    <Box display="flex" width={300} justifyContent="space-evenly">
      <Tooltip
        title={
          <Typography style={{ fontSize: "16px", fontWeight: "lighter" }}>
            {"Export To Excel"}
          </Typography>
        }
      >
        <IconButton size="small" onClick={exportToExcel}>
          <img
            style={{ height: "30px", paddingTop: "4px" }}
            alt="Excel-Icon"
            // src={ExcelIcon}
          />
        </IconButton>
      </Tooltip>
      <Tooltip
        title={
          <Typography style={{ fontSize: "16px", fontWeight: "lighter" }}>
            {"Export To Csv"}
          </Typography>
        }
      >
        <IconButton size="small" onClick={exportToCsv}>
          <DescriptionIcon color="primary" />
        </IconButton>
      </Tooltip>
      <Tooltip
        title={
          <Typography style={{ fontSize: "16px", fontWeight: "lighter" }}>
            {hideFilters ? "Show Filters" : "Hide Filters"}
          </Typography>
        }
      >
        <IconButton size="small" onClick={setHideFilters}>
          <FilterListIcon color="primary" />
        </IconButton>
      </Tooltip>
      <Tooltip
        title={
          <Typography style={{ fontSize: "16px", fontWeight: "lighter" }}>
            {"Select Columns To Disply"}
          </Typography>
        }
      >
        <IconButton size="small" onClick={handleColumnHideToggle}>
          <ViewWeekIcon color="primary" />
        </IconButton>
      </Tooltip>
      <Tooltip
        title={
          <Typography style={{ fontSize: "16px", fontWeight: "lighter" }}>
            {"Reset Table Settings"}
          </Typography>
        }
      >
        <IconButton size="small" onClick={resetDataSource}>
          <RotateLeftIcon color="primary" />
        </IconButton>
      </Tooltip>
      {anableSelectRows &&
        bulkOperation({
          disabled: !(selectedRecords && selectedRecords.length > 0),
          includeIds,
          excludeIds,
          onFinishCallBack,
        })}
    </Box>
  );
};

export default PaginationTableToolbar;